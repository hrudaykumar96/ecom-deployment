import{r as t,u as m,a as u,b as h,l as p,c as o,s as x,j as e,d as g,L as n}from"./index-02v5Kx9p.js";import{u as f,c as b,a as d}from"./index.esm-BnwETkTM.js";import{B as j}from"./ButtonLoader-Ds9zo1c0.js";const E=()=>{t.useEffect(()=>{document.title="Ecom | Login"},[]);const r=m(),{loading:c,data:a}=u(i=>i.loginuserslice),l=h();t.useEffect(()=>{localStorage.getItem("token")&&l("/home")},[l]);const s=f({initialValues:{email:"",password:""},validationSchema:b({email:d().required("Enter email address").email("Enter a valid email address"),password:d().required("Enter password").min(8,"Password should be at least 8 characters").max(12,"Password should not exceed 12 characters")}),onSubmit:i=>{r(p(i))}});return t.useEffect(()=>{a&&(a.success?(s.resetForm(),r(o()),localStorage.setItem("token",`${a.success}`),l("/home")):a.email?(s.setErrors({email:`${a.email}`}),r(o())):a.password?(s.setErrors({password:`${a.password}`}),r(o())):a.error&&(x("Error","internal server error","error"),s.resetForm(),localStorage.removeItem("token"),r(o())))},[a,s,r,l]),e.jsx("div",{className:"position-fixed top-0 bottom-0 end-0 start-0 d-flex align-items-center justify-content-center flex-column",style:{backgroundImage:"linear-gradient(#ec7c34, #fcc404)"},children:e.jsxs("form",{className:"container bg-light p-3",style:{width:"30rem",borderRadius:"1rem",maxWidth:"100%"},onSubmit:s.handleSubmit,children:[e.jsx("img",{src:g,alt:"logo",className:"img-fluid mx-auto d-block",loading:"lazy",style:{mixBlendMode:"darken",height:"100px"}}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"email",className:"form-label",children:"Email"}),e.jsx("span",{className:"text-danger",children:"*"}),e.jsx("input",{type:"email",name:"email",id:"email",value:s.values.email,onBlur:s.handleBlur,onChange:s.handleChange,placeholder:"Enter email address",className:`form-control ${s.errors.email?"is-invalid":""}`}),e.jsx("div",{className:"invalid-feedback",children:s.errors.email})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"password",className:"form-label",children:"Password"}),e.jsx("span",{className:"text-danger",children:"*"}),e.jsx("input",{type:"password",name:"password",id:"password",value:s.values.password,onBlur:s.handleBlur,onChange:s.handleChange,placeholder:"Enter password",className:`form-control ${s.errors.password?"is-invalid":""}`}),e.jsx("div",{className:"invalid-feedback",children:s.errors.password})]}),c?e.jsx("div",{className:"mb-3",children:e.jsx(j,{})}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-3 d-flex justify-content-around flex-wrap",children:[e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Login"}),e.jsx(n,{to:"/forgotpassword",children:"Forgot Password?"})]}),e.jsx("div",{className:"mb-3",children:e.jsx(n,{to:"/signup",className:"btn btn-success w-100",children:"Create Account"})})]})]})})};export{E as default};
