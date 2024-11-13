import { useEffect } from "react";
import logo from "../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { signupuser } from "../redux/api";
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';
import { userreducer } from "../redux/slices";
import ButtonLoader from "../effects/ButtonLoader";

const Signup = () => {
  /* document title */
  useEffect(() => {
    document.title = "Ecom | Signup";
  }, []);

  const dispatch = useDispatch();
  const { loading, data } = useSelector((state)=>state.userslice);
  const navigate = useNavigate();

    /* if user is authenticated redirect to home */
    useEffect(()=>{
      if(localStorage.getItem('token')){
        navigate('/home')
      }
    },[navigate])

  /* form validation */
  const formik = useFormik({
    initialValues:{
      name:'', email:'',mobile:'', password:'', confirm_password:''
    },
    validationSchema: yup.object({
      name: yup.string().required('enter your name').min(3,'name should be atleast 3 characters'),
      email: yup.string().required('enter email address').email('enter valid email address'),
      mobile: yup.string().required('enter mobile number').length(10,'enter valid mobile number'),
      password: yup.string().required('enter password').min(8,'password should be atleast 8 characters').max(12,'password should not be more than 12 characters long'),
      confirm_password: yup.string().required('enter confirm password').oneOf([yup.ref('password')],'password does not match')
    }),
    onSubmit:(values)=>{
      dispatch(signupuser(values));
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
      } else if(data.mobile){
        formik.setErrors({mobile:`${data.mobile}`})
        dispatch(userreducer());
      }else if(data.error){
        swal("Error", 'internal server error', "error")
        formik.resetForm();
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
          <label htmlFor="name" className="form-label">
            name
          </label>
          <span className="text-danger">*</span>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={`form-control ${formik.errors.name ? 'is-invalid': ''}`}
            placeholder="enter full name"
          />
          <div className="invalid-feedback">{formik.errors.name}</div>
        </div>
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
            className={`form-control ${formik.errors.email ? 'is-invalid': ''}`}
            placeholder="enter email address"
          />
            <div className="invalid-feedback">{formik.errors.email}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">mobile</label><span className="text-danger">*</span>
          <input type="number" name="mobile" onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="enter mobile number" value={formik.values.mobile} className={`form-control ${formik.errors.mobile ? 'is-invalid':''}`}/>
          <div className="invalid-feedback">{formik.errors.mobile}</div>
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
            className={`form-control ${formik.errors.password ? 'is-invalid': ''}`}
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
            value={formik.values.confirm_password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className={`form-control ${formik.errors.confirm_password ? 'is-invalid': ''}`}
            placeholder="enter confirm password"
          />
          <div className="invalid-feedback">{formik.errors.confirm_password}</div>
        </div>
        {
          loading ? (
            <>
            <div className="mb-3">
              <ButtonLoader/>
            </div>
            </>
          ):(
            <div className="mb-3 d-flex justify-content-around flex-wrap">
            <input type="submit" value="signup" className="btn btn-success" />
            <Link to="/">back to login</Link>
          </div>
          )
        }
      </form>
    </div>
  );
};

export default Signup;