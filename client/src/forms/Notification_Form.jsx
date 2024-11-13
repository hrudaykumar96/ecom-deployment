import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getnotificationsdata, postnotifications } from '../redux/api';
import ButtonLoader from '../effects/ButtonLoader';
import swal from 'sweetalert';
import { clearpostnotificationresponse } from '../redux/slices';
import { useFormik } from 'formik';
import * as yup from "yup";

const Notification_Form = React.memo(() => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { loading, response } = useSelector((state)=>state.postnotificationslice);

  const formik = useFormik({
    initialValues:{
      content:''
    },
    validavalidationSchema:{
      content: yup.string().required('enter message')
    },
    onSubmit:(values)=>{
      if(token){
        dispatch(postnotifications({token, values}))
      }
    }
  })

  useEffect(()=>{
    if(response){
      if(response?.success){
        formik.resetForm();
        dispatch(clearpostnotificationresponse());
        dispatch(getnotificationsdata(token));
        swal('Success','notification posted successfully', 'success');
      } 
      
      if(response?.error){
        swal('Error','internal server error', 'error');
        dispatch(clearpostnotificationresponse());
      }
    }
  },[response, dispatch]);

  return (
    <div className='min-vh-100 w-100 d-flex align-items-center justify-content-center flex-column'>
        <form className='container p-3 bg-light' style={{borderRadius:'1rem'}} onSubmit={formik.handleSubmit}>
            <h4 className='text-center'>send notification</h4>
            <div className="mb-3">
                <label htmlFor="notification" className="form-label">notification</label><span className="text-danger">*</span>
                <textarea name="content" value={formik.values.content} required onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='write notification message' className={`form-control ${formik.errors.content ? 'is-invalid' : ''}`}></textarea>
                <div className="invalid-feedback">{formik.errors.content}</div>
            </div>
            <div className="mb-3 text-end">
              { loading ? <ButtonLoader/> : (
                <input type="submit" value="send notification" className='btn btn-success' />
              )}
            </div>
        </form>
        
    </div>
  )
})
Notification_Form.displayName = 'Notification_Form'
export default Notification_Form