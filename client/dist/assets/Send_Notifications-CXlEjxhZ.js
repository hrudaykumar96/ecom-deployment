import{R as m,u as d,a as u,a9 as f,r as x,aa as o,o as h,s as r,j as e}from"./index-02v5Kx9p.js";import{N as j}from"./Navs-C4xq8lsz.js";import{B as p}from"./ButtonLoader-Ds9zo1c0.js";import{u as N,a as v}from"./index.esm-BnwETkTM.js";const c=m.memo(()=>{const a=d(),i=localStorage.getItem("token"),{loading:l,response:t}=u(n=>n.postnotificationslice),s=N({initialValues:{content:""},validavalidationSchema:{content:v().required("enter message")},onSubmit:n=>{i&&a(f({token:i,values:n}))}});return x.useEffect(()=>{t&&(t!=null&&t.success&&(s.resetForm(),a(o()),a(h(i)),r("Success","notification posted successfully","success")),t!=null&&t.error&&(r("Error","internal server error","error"),a(o())))},[t,a]),e.jsx("div",{className:"min-vh-100 w-100 d-flex align-items-center justify-content-center flex-column",children:e.jsxs("form",{className:"container p-3 bg-light",style:{borderRadius:"1rem"},onSubmit:s.handleSubmit,children:[e.jsx("h4",{className:"text-center",children:"send notification"}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"notification",className:"form-label",children:"notification"}),e.jsx("span",{className:"text-danger",children:"*"}),e.jsx("textarea",{name:"content",value:s.values.content,required:!0,onBlur:s.handleBlur,onChange:s.handleChange,placeholder:"write notification message",className:`form-control ${s.errors.content?"is-invalid":""}`}),e.jsx("div",{className:"invalid-feedback",children:s.errors.content})]}),e.jsx("div",{className:"mb-3 text-end",children:l?e.jsx(p,{}):e.jsx("input",{type:"submit",value:"send notification",className:"btn btn-success"})})]})})});c.displayName="Notification_Form";const y=()=>e.jsxs("div",{className:"min-vh-100 w-100",style:{backgroundColor:"rgba(217,217,217"},children:[e.jsx(j,{}),e.jsx(c,{})]});export{y as default};
