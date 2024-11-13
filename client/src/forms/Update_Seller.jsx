import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from "yup";
import propTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { getsellers, updatesellerdatabyid } from '../redux/api';
import ButtonLoader from '../effects/ButtonLoader';
import { clearsellerdataid, clearupdatesellerdata } from '../redux/slices';
import swal from 'sweetalert';

const Update_Seller = React.memo(({data}) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { loading, response } = useSelector((state)=>state.updatesellerdataslicebyid);
  /* Form validation */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.success?.name || '',
      email: data?.success?.email || '',
      mobile: data?.success?.mobile || '',
      address: data?.success?.address || '',
      status: data?.success?.status || ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Enter your name').min(3, 'Name should be at least 3 characters'),
      email: yup.string().required('Enter email address').email('Enter valid email address'),
      mobile: yup.string().required('Enter mobile number').length(10, 'Enter valid mobile number'),
      address: yup.string().required('Enter address').min(5, 'Enter full address'),
      status: yup.string().required('Select status')
    }),
    onSubmit: (values) => {
      dispatch(updatesellerdatabyid({token, id:data?.success?._id, values}))
    }
  });

  useEffect(() => {
    if (response) {
      if (response?.success) {
        formik.resetForm(); 
        const modalElement = document.getElementById('sellerModal');
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide(); 
        }
        swal('Success', `${response?.success}`, 'success'); 
        dispatch(clearupdatesellerdata());
        dispatch(getsellers(token));
      } 

      else if (response?.email) {
        formik.setErrors({ email: response?.email }); 
      }

      else if (response?.mobile) {
        formik.setErrors({ mobile: response?.mobile }); 
      }

      if (response?.error) {
        dispatch(clearsellerdataid());
        dispatch(clearupdatesellerdata());
        const modalElement = document.getElementById('sellerModal');
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide(); 
        }
        swal('Error', 'Internal server error', 'error'); 
      }
    }
  }, [formik, response, dispatch]);

  return (
    <div className="modal fade" id="sellerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Profile</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <span className='text-danger'>*</span>
                <input
                  type="text"
                  name='name'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className={`form-control ${formik.errors.name ? 'is-invalid' : ''}`}
                  placeholder='Enter your name'
                />
                <div className="invalid-feedback">{formik.errors.name}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <span className='text-danger'>*</span>
                <input
                  type="email"
                  name='email'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className={`form-control ${formik.errors.email ? 'is-invalid' : ''}`}
                  placeholder='Enter email address'
                />
                <div className="invalid-feedback">{formik.errors.email}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">Mobile Number</label>
                <span className='text-danger'>*</span>
                <input
                  type="text"
                  name='mobile'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.mobile}
                  className={`form-control ${formik.errors.mobile ? 'is-invalid' : ''}`}
                  placeholder='Enter mobile number'
                />
                <div className="invalid-feedback">{formik.errors.mobile}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <span className='text-danger'>*</span>
                <textarea
                  name='address'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className={`form-control ${formik.errors.address ? 'is-invalid' : ''}`}
                  placeholder='Enter address'
                ></textarea>
                <div className="invalid-feedback">{formik.errors.address}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <span className="text-danger">*</span>
                <select
                  name='status'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.status}
                  className={`form-select ${formik.errors.status ? 'is-invalid' : ''}`}
                >
                  <option value="" label="Select Status" />
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending verification">Pending Verification</option>
                  <option value="suspended">Suspended</option>
                  <option value="banned">Banned</option>
                  <option value="on hold">On Hold</option>
                  <option value="deactivated">Deactivated</option>
                </select>
                <div className="invalid-feedback">{formik.errors.status}</div>
              </div>
            </div>
            <div className="modal-footer">
              { loading ? (<ButtonLoader/>):(
                <>
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="submit" className="btn btn-primary">Save changes</button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
});
Update_Seller.displayName = 'Update_Seller';
Update_Seller.propTypes={
  data:propTypes.any
}
export default Update_Seller;