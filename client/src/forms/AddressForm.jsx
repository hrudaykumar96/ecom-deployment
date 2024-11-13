import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import ButtonLoader from "../effects/ButtonLoader";
import { clearupdateuserdata } from "../redux/slices";
import { updateuser } from "../redux/api";

const AddressForm = React.memo(({ data }) => {
  const dispatch = useDispatch();
  const { loading, response } = useSelector((state) => state.updateuserdata);
  const token = localStorage.getItem('token');
  /* Form validation */
  const formik = useFormik({
    initialValues: {
      name: data?.success?.name || "",
      email: data?.success?.email || "",
      mobile: data?.success?.mobile || "",
      address: data?.success?.address || "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Enter your name")
        .min(3, "Name should be at least 3 characters"),
      email: yup
        .string()
        .required("Enter email address")
        .email("Enter valid email address"),
      mobile: yup
        .string()
        .required("Enter mobile number")
        .length(10, "Enter valid mobile number"),
      address: yup
        .string()
        .required("Enter full address")
        .min(5, "Enter full address"),
    }),
    onSubmit: (values) => {
      dispatch(updateuser({values,token}));
    },
  });

  useEffect(() => {
    if (response) {
      if (response.success) {
        formik.resetForm();
        const modalElement = document.getElementById("profileModal");
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
        dispatch(clearupdateuserdata());
        swal("Success", `${response.success}`, "success");
      } else if (response.email) {
        formik.setErrors({ email: `${response.email}` });
        dispatch(clearupdateuserdata());
      } else if (response.mobile) {
        formik.setErrors({ mobile: `${response.mobile}` });
        dispatch(clearupdateuserdata());
      } else if (response.error) {
        swal("Error", "internal server error", "error");
        formik.resetForm();
        dispatch(clearupdateuserdata());
        const modalElement = document.getElementById("profileModal");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
      }
    }
  }, [response, dispatch,token]);

  return (
    <div
      className="modal fade"
      id="profileModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.name &&
                    (formik.errors.name ? "is-invalid" : "")
                  }`}
                  placeholder="Enter your name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="invalid-feedback">{formik.errors.name}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <span className="text-danger">*</span>
                <input
                  type="email"
                  className={`form-control ${
                    formik.touched.email &&
                    (formik.errors.email ? "is-invalid" : "")
                  }`}
                  placeholder="Enter email address"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="invalid-feedback">{formik.errors.email}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number
                </label>
                <span className="text-danger">*</span>
                <input
                  type="text" // Changed to text to maintain length validation
                  className={`form-control ${
                    formik.touched.mobile &&
                    (formik.errors.mobile ? "is-invalid" : "")
                  }`}
                  placeholder="Enter mobile number"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="invalid-feedback">{formik.errors.mobile}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <span className="text-danger">*</span>
                <textarea
                  className={`form-control ${
                    formik.touched.address &&
                    (formik.errors.address ? "is-invalid" : "")
                  }`}
                  placeholder="Enter address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
                <div className="invalid-feedback">{formik.errors.address}</div>
              </div>
            </div>
            <div className="modal-footer">
              {loading ? (
                <ButtonLoader />
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

AddressForm.displayName = "AddressForm";
AddressForm.propTypes = {
  data: propTypes.any,
};
export default AddressForm;