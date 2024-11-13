import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { loginuser } from "../redux/api";
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';
import { loginreducer } from "../redux/slices";
import ButtonLoader from "../effects/ButtonLoader";

const Login = () => {
  /* Document title */
  useEffect(() => {
    document.title = "Ecom | Login";
  }, []);

  const dispatch = useDispatch();
  const { loading, data } = useSelector((state)=>state.loginuserslice);
  const navigate = useNavigate();

  /* if user is authenticated redirect to home */
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/home')
    }
  },[navigate])

  /* Form validation */
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string()
        .required('Enter email address')
        .email('Enter a valid email address'),
      password: yup.string()
        .required('Enter password')
        .min(8, 'Password should be at least 8 characters')
        .max(12, 'Password should not exceed 12 characters'),
    }),
    onSubmit: (values) => {
      dispatch(loginuser(values));
    },
  });

  useEffect(()=>{
    if(data){
      if(data.success){
        formik.resetForm();
        dispatch(loginreducer());
        localStorage.setItem('token',`${data.success}`);
        navigate('/home');
      } else if(data.email){
        formik.setErrors({email:`${data.email}`})
        dispatch(loginreducer());
      } else if(data.password){
        formik.setErrors({password:`${data.password}`})
        dispatch(loginreducer());
      }else if(data.error){
        swal("Error", 'internal server error', "error")
        formik.resetForm();
        localStorage.removeItem('token')
        dispatch(loginreducer());
      } 
    }

  },[data, formik, dispatch, navigate]);

  return (
    <div
      className="position-fixed top-0 bottom-0 end-0 start-0 d-flex align-items-center justify-content-center flex-column"
      style={{ backgroundImage: "linear-gradient(#ec7c34, #fcc404)" }}
    >
      <form
        className="container bg-light p-3"
        style={{ width: "30rem", borderRadius: "1rem", maxWidth: "100%" }}
        onSubmit={formik.handleSubmit}
      >
        <img
          src={logo}
          alt="logo"
          className="img-fluid mx-auto d-block"
          loading="lazy"
          style={{ mixBlendMode: "darken", height: "100px" }}
        />
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <span className="text-danger">*</span>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter email address"
            className={`form-control ${formik.errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{formik.errors.email}</div> 
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <span className="text-danger">*</span>
          <input
            type="password"
            name="password"
            id="password" // Added id for accessibility
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter password"
            className={`form-control ${formik.errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{formik.errors.password}</div> 
        </div>
        { loading ? (
          <div className="mb-3">
            <ButtonLoader/>
          </div>
        ):(
          <>
          <div className="mb-3 d-flex justify-content-around flex-wrap">
          <button type="submit" className="btn btn-primary">Login</button>
          <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
        <div className="mb-3">
          <Link to="/signup" className="btn btn-success w-100">
            Create Account
          </Link>
        </div>
        </>
        )}
      </form>
    </div>
  );
};

export default Login;