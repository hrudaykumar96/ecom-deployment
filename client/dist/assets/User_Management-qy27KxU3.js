import{R as _,a as p,u as w,r as h,a2 as S,a3 as I,s as j,j as e,p as k,a4 as U,a5 as $,a6 as C,a7 as F,a8 as L}from"./index-02v5Kx9p.js";import{N as R}from"./Navs-C4xq8lsz.js";import{u as q,c as A,a as v}from"./index.esm-BnwETkTM.js";import{B as T}from"./ButtonLoader-Ds9zo1c0.js";const M=_.memo(({setId:l,userdata:r})=>{const{loading:f,data:o,error:b}=p(a=>a.alluserslice),n=p(a=>a.updateuserdatabyidslice.response),s=p(a=>a.deleteuserdatabyidslice.response),d=w(),c=localStorage.getItem("token"),N=a=>{l(a)},[i,g]=h.useState({name:"",email:"",mobile:"",role:""});h.useEffect(()=>{c&&d(S(c)),n!=null&&n.success&&c&&d(S(c)),s!=null&&s.success&&c&&d(S(c))},[c,d,n,s]);const u=h.useCallback(a=>{const{name:m,value:y}=a.target;g(E=>({...E,[m]:y}))},[]),t=h.useMemo(()=>{var a;return(a=o==null?void 0:o.success)==null?void 0:a.filter(m=>(i.name?m.name.toLowerCase().includes(i.name.toLowerCase()):!0)&&(i.email?m.email.toLowerCase().includes(i.email.toLowerCase()):!0)&&(i.mobile?m.mobile.includes(i.mobile):!0)&&(i.role?m.role.toLowerCase().includes(i.role.toLowerCase()):!0))},[o,i]),x=a=>{j({title:"Are you sure?",text:"You will not be able to recover",icon:"warning",buttons:["No, cancel plx!","Yes, delete it!"]}).then(m=>{m?(d(U({token:c,id:a})),j("Deleted!","Your imaginary file has been deleted.","success")):j("Cancelled","Your imaginary file is safe :)","error")})};return h.useEffect(()=>{o!=null&&o.error&&(d(I()),j("Error","Internal server error","error"))},[d,o]),e.jsxs("div",{className:"d-flex align-items-center justify-content-center flex-column min-vh-100 p-2",children:[e.jsx("h4",{className:"text-center",children:"User Management"}),e.jsx("div",{className:"table-responsive w-100",children:e.jsxs("table",{className:"table table-bordered text-center",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:e.jsxs("div",{className:"d-flex flex-column",children:[e.jsx("p",{children:"Name"}),e.jsx("input",{type:"search",value:i.name,name:"name",className:"form-control",placeholder:"Search by Name",onChange:u})]})}),e.jsx("th",{scope:"col",children:e.jsxs("div",{className:"d-flex flex-column",children:[e.jsx("p",{children:"Email"}),e.jsx("input",{type:"email",value:i.email,name:"email",className:"form-control",placeholder:"Search by Email",onChange:u})]})}),e.jsx("th",{scope:"col",children:e.jsxs("div",{className:"d-flex flex-column",children:[e.jsx("p",{children:"Mobile Number"}),e.jsx("input",{type:"number",value:i.mobile,name:"mobile",className:"form-control",placeholder:"Search by Mobile",onChange:u})]})}),e.jsx("th",{scope:"col",children:e.jsxs("div",{className:"d-flex flex-column",children:[e.jsx("p",{children:"Role"}),e.jsxs("select",{className:"form-select",name:"role","aria-label":"Role Select",value:i.role,onChange:u,children:[e.jsx("option",{value:"",children:"Select Role"}),e.jsx("option",{value:"admin",children:"Admin"}),e.jsx("option",{value:"seller",children:"Seller"}),e.jsx("option",{value:"user",children:"User"})]})]})}),e.jsx("th",{scope:"col",children:"Action"})]})}),e.jsx("tbody",{children:f?e.jsx("tr",{children:e.jsx("td",{colSpan:"5",children:e.jsx("p",{className:"text-center",children:"Loading, please wait..."})})}):b?e.jsx("tr",{children:e.jsx("td",{colSpan:"5",children:e.jsx("p",{className:"text-center text-danger",children:b.message})})}):e.jsx(e.Fragment,{children:(t==null?void 0:t.length)>0?t.map((a,m)=>{var y,E;return e.jsxs("tr",{children:[e.jsx("td",{children:a.name}),e.jsx("td",{style:{textTransform:"none"},children:a.email}),e.jsx("td",{children:a.mobile}),e.jsx("td",{children:a.role}),e.jsx("td",{children:e.jsxs("div",{className:"d-flex flex-wrap justify-content-center",children:[e.jsx("button",{type:"button",className:`btn btn-success ${((y=r==null?void 0:r.success)==null?void 0:y._id)===a._id?"disabled":""}`,"data-bs-toggle":"modal","data-bs-target":"#userModal",onClick:()=>N(a._id),children:e.jsx("i",{className:"fa-solid fa-pen-to-square"})}),e.jsx("button",{type:"button",className:`btn btn-danger ${((E=r==null?void 0:r.success)==null?void 0:E._id)===a._id?"disabled":""}`,onClick:()=>x(a._id),children:e.jsx("i",{className:"fa-solid fa-trash"})})]})})]},m)}):e.jsx("tr",{children:e.jsx("td",{colSpan:"5",children:e.jsx("p",{className:"text-center text-danger",children:"no data found"})})})})})]})})]})});M.displayName="User_Management_Section";M.propTypes={setId:k.any,userdata:k.any};const B=_.memo(({data:l})=>{var d,c,N,i,g,u;const r=w(),f=localStorage.getItem("token"),o=(d=l==null?void 0:l.success)==null?void 0:d._id,{loading:b,response:n}=p(t=>t.updateuserdatabyidslice),s=q({enableReinitialize:!0,initialValues:{name:((c=l==null?void 0:l.success)==null?void 0:c.name)||"",email:((N=l==null?void 0:l.success)==null?void 0:N.email)||"",mobile:((i=l==null?void 0:l.success)==null?void 0:i.mobile)||"",address:((g=l==null?void 0:l.success)==null?void 0:g.address)||"",role:((u=l==null?void 0:l.success)==null?void 0:u.role)||""},validationSchema:A({name:v().required("Enter your name").min(3,"Name should be at least 3 characters"),email:v().required("Enter email address").email("Enter valid email address"),mobile:v().required("Enter mobile number").length(10,"enter valid mobile number"),address:v().required("Enter address"),role:v().required("Select a role")}),onSubmit:t=>{r($({token:f,id:o,values:t}))}});return h.useEffect(()=>{if(n){if(n.success){s.resetForm();const t=document.getElementById("userModal"),x=window.bootstrap.Modal.getInstance(t);x&&x.hide(),j("Success",`${n.success}`,"success"),r(C())}else if(n.email)s.setErrors({email:`${n.email}`}),r(C());else if(n.mobile)s.setErrors({mobile:`${n.mobile}`}),r(C());else if(n.error){s.resetForm();const t=document.getElementById("userModal"),x=window.bootstrap.Modal.getInstance(t);x&&x.hide(),j("Error","Internal server error","error"),r(C())}}},[r,s,n]),e.jsx("div",{className:"modal fade",id:"userModal",tabIndex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-dialog-centered",children:e.jsx("div",{className:"modal-content",children:e.jsxs("form",{onSubmit:s.handleSubmit,children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h1",{className:"modal-title fs-5",id:"exampleModalLabel",children:"Update User"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"name",className:"form-label",children:"Name"}),e.jsx("span",{className:"text-danger",children:"*"}),e.jsx("input",{type:"text",name:"name",onBlur:s.handleBlur,onChange:s.handleChange,value:s.values.name,className:`form-control ${s.errors.name?"is-invalid":""}`,placeholder:"Enter your name"}),e.jsx("div",{className:"invalid-feedback",children:s.errors.name})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"email",className:"form-label",children:"Email"}),e.jsx("span",{className:"text-danger",children:"*"}),e.jsx("input",{type:"email",name:"email",onBlur:s.handleBlur,onChange:s.handleChange,value:s.values.email,className:`form-control ${s.errors.email?"is-invalid":""}`,placeholder:"Enter email address"}),e.jsx("div",{className:"invalid-feedback",children:s.errors.email})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"mobile",className:"form-label",children:"Mobile Number"}),e.jsx("span",{className:"text-danger",children:"*"}),e.jsx("input",{type:"text",name:"mobile",onBlur:s.handleBlur,onChange:s.handleChange,value:s.values.mobile,className:`form-control ${s.errors.mobile?"is-invalid":""}`,placeholder:"Enter mobile number"}),e.jsx("div",{className:"invalid-feedback",children:s.errors.mobile})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"address",className:"form-label",children:"Address"}),e.jsx("span",{className:"text-danger",children:"*"}),e.jsx("textarea",{name:"address",onBlur:s.handleBlur,onChange:s.handleChange,value:s.values.address,className:`form-control ${s.errors.address?"is-invalid":""}`,placeholder:"Enter address"}),e.jsx("div",{className:"invalid-feedback",children:s.errors.address})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"role",className:"form-label",children:"Role"}),e.jsx("span",{className:"text-danger",children:"*"}),e.jsxs("select",{name:"role",onBlur:s.handleBlur,onChange:s.handleChange,value:s.values.role,className:`form-select ${s.errors.role?"is-invalid":""}`,children:[e.jsx("option",{value:"",label:"Select Role"}),e.jsx("option",{value:"admin",children:"Admin"}),e.jsx("option",{value:"seller",children:"Seller"}),e.jsx("option",{value:"user",children:"User"})]}),e.jsx("div",{className:"invalid-feedback",children:s.errors.role})]})]}),e.jsx("div",{className:"modal-footer",children:b?e.jsx(T,{}):e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",className:"btn btn-secondary","data-bs-dismiss":"modal",children:"Close"}),e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Save changes"})]})})]})})})})});B.displayName="Update_User";B.propTypes={data:k.any};const G=()=>{h.useEffect(()=>{document.title="Ecom | User Management"},[]);const l=w(),[r,f]=h.useState(null),o=localStorage.getItem("token"),b=p(s=>s.userdatabyidslice.data),n=p(s=>s.userdata.data);return h.useEffect(()=>{r&&o&&(l(F({token:o,id:r})),l(L()))},[r,o,l]),e.jsxs("div",{className:"min-vh-100 w-100",style:{backgroundColor:"rgba(217,217,217"},children:[e.jsx(R,{}),e.jsx(M,{setId:f,userdata:n}),e.jsx(B,{data:b})]})};export{G as default};
