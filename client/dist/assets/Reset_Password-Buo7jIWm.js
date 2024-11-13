import{r as o,b as m,u,a as p,g as h,s as t,f as i,j as e,d as f,L as x}from"./index-02v5Kx9p.js";import{u as w,c as g,a as n,b}from"./index.esm-BnwETkTM.js";import{B as v}from"./ButtonLoader-Ds9zo1c0.js";const y=()=>{o.useEffect(()=>{document.title="Ecom | Forgot Password"},[]);const d=m(),r=u(),{loading:c,data:a}=p(l=>l.userslice);o.useEffect(()=>{localStorage.getItem("token")&&d("/home")},[d]);const s=w({initialValues:{email:"",password:"",confirm_password:""},validationSchema:g({email:n().required("enter email address").email("enter valid email address"),password:n().required("enter password").min(8,"password should be atleast 8 characters").max(12,"password should not exceeds greater than 12 characters"),confirm_password:n().required("enter confirm password").oneOf([b("password")],"Passwords does not match")}),onSubmit:l=>{r(h(l))}});return o.useEffect(()=>{a&&(a.success?(t("Success",`${a.success}`,"success"),s.resetForm(),r(i())):a.email?(s.setErrors({email:`${a.email}`}),r(i())):a.error&&(t("Error","internal server error","error"),s.resetForm(),localStorage.removeItem("token"),r(i())))},[a,s,r]),e.jsx("div",{className:"position-fixed top-0 bottom-0 end-0 start-0 d-flex align-items-center justify-content-center flex-column",style:{backgroundImage:"linear-gradient(#ec7c34, #fcc404)"},children:e.jsxs("form",{className:"container bg-light p-3",onSubmit:s.handleSubmit,style:{width:"30rem",borderRadius:"1rem",maxWidth:"100%"},children:[e.jsx("img",{src:f,alt:"logo",loading:"lazy",className:"img-fluid mx-auto d-block",style:{mixBlendMode:"darken",height:"100px"}}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"email",className:"form-label",children:"email"}),e.jsx("span",{className:"text-danger",children:"*"}),e.jsx("input",{type:"email",name:"email",value:s.values.email,onBlur:s.handleBlur,onChange:s.handleChange,className:`form-control ${s.errors.email?"is-invalid":""}`,placeholder:"enter email address"}),e.jsx("div",{className:"invalid-feedback",children:s.errors.email})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"password",className:"form-label",children:"password"}),e.jsx("span",{className:"text-danger",children:"*"}),e.jsx("input",{type:"password",name:"password",value:s.values.password,onBlur:s.handleBlur,onChange:s.handleChange,className:`form-control ${s.errors.password?"is-invalid":""}`,placeholder:"enter password"}),e.jsx("div",{className:"invalid-feedback",children:s.errors.password})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"password",className:"form-label",children:"confirm password"}),e.jsx("span",{className:"text-danger",children:"*"}),e.jsx("input",{type:"password",name:"confirm_password",onChange:s.handleChange,onBlur:s.handleBlur,value:s.values.confirm_password,className:`form-control ${s.errors.confirm_password?"is-invalid":""}`,placeholder:"enter confirm password"}),e.jsx("div",{className:"invalid-feedback",children:s.errors.confirm_password})]}),c?e.jsx("div",{className:"mb-3",children:e.jsx(v,{})}):e.jsxs("div",{className:"mb-3 d-flex justify-content-around flex-wrap",children:[e.jsx("input",{type:"submit",value:"reset password",className:"btn btn-success"}),e.jsx(x,{to:"/",children:"back to login"})]})]})})};export{y as default};
