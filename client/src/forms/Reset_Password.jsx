import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userreducer } from "../redux/slices";
import swal from "sweetalert";
import ButtonLoader from "../effects/ButtonLoader";
import { changepassword } from "../redux/api";

const Reset_Password = () => {
  /* document title */
  useEffect(() => {
    document.title = "Ecom | Forgot Password";
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state)=>state.userslice);

    /* if user is authenticated redirect to home */
    useEffect(()=>{
      if(localStorage.getItem('token')){
        navigate('/home')
      }
    },[navigate]);

  /* form validation */
  const formik = useFormik({
    initialValues:{
      email:'', password:'', confirm_password:''
    },
    validationSchema: yup.object({
      email: yup.string().required('enter email address').email('enter valid email address'),
      password: yup.string().required('enter password').min(8, 'password should be atleast 8 characters').max(12,'password should not exceeds greater than 12 characters'),
      confirm_password: yup.string().required('enter confirm password').oneOf([yup.ref("password")], "Passwords does not match"),
    }),
    onSubmit:(values)=>{
      dispatch(changepassword(values));
    }
  })

  useEffect(()=>{
    if(data){
      if(data.success){
        swal("Success", `${data.success}`, "success")
        formik.resetForm();
        dispatch(userreducer());
      } else if(data.email){
        formik.setErrors({email:`${data.email}`})
        dispatch(userreducer());
      } else if(data.error){
        swal("Error", 'internal server error', "error")
        formik.resetForm();
        localStorage.removeItem('token')
        dispatch(userreducer());
      } 
    }

  },[data, formik, dispatch]);

  return (
    <div
      className="position-fixed top-0 bottom-0 end-0 start-0 d-flex align-items-center justify-content-center flex-column"
      style={{ backgroundImage: "linear-gradient(#ec7c34, #fcc404)" }}
    >
      <form
        className="container bg-light p-3" onSubmit={formik.handleSubmit}
        style={{ width: "30rem", borderRadius: "1rem", maxWidth: "100%" }}
      >
        <img
          src={logo}
          alt="logo"
          loading="lazy"
          className="img-fluid mx-auto d-block"
          style={{ mixBlendMode: "darken", height: "100px" }}
        />
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <span className="text-danger">*</span>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={`form-control ${formik.errors.email ? 'is-invalid' : ''}`}
            placeholder="enter email address"
          />
          <div className="invalid-feedback">{formik.errors.email}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <span className="text-danger">*</span>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={`form-control ${formik.errors.password ? 'is-invalid' : ''}`}
            placeholder="enter password"
          />
          <div className="invalid-feedback">{formik.errors.password}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            confirm password
          </label>
          <span className="text-danger">*</span>
          <input
            type="password"
            name="confirm_password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm_password}
            className={`form-control ${formik.errors.confirm_password ? 'is-invalid' : ''}`}
            placeholder="enter confirm password"
          />
          <div className="invalid-feedback">{formik.errors.confirm_password}</div>
        </div>
        { loading ? (
          <div className="mb-3">
            <ButtonLoader/>
          </div>
        ):(
          <div className="mb-3 d-flex justify-content-around flex-wrap">
          <input
            type="submit"
            value="reset password"
            className="btn btn-success"
          />
          <Link to="/">back to login</Link>
        </div>
        )}
      </form>
    </div>
  );
};

export default Reset_Password;