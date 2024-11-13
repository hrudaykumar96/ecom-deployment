import{R as L,q as O,u as W,r as u,a as E,b as A,$ as V,a0 as z,X as M,s as p,a1 as b,j as s}from"./index-02v5Kx9p.js";import{N as X}from"./Navs-C4xq8lsz.js";import{u as G,c as H,a as c,d as w,e as J,f as K}from"./index.esm-BnwETkTM.js";import{B as Q}from"./ButtonLoader-Ds9zo1c0.js";const P=L.memo(()=>{var v,x,j,N,y,B,C,k,q,F,$,S;const U=["image/jpg","image/jpeg","image/png"],{id:h}=O(),t=localStorage.getItem("token"),o=W(),[d,g]=u.useState([]),a=E(r=>r.getproductsdataslicebyid.data),{loading:R,response:i}=E(r=>r.updateproductsdataslicebyid),f=A();u.useEffect(()=>{t&&o(V({token:t,id:h}))},[t,o,h]);const e=G({enableReinitialize:!0,initialValues:{brand_name:((v=a==null?void 0:a.success)==null?void 0:v.brand_name)||"",category:((x=a==null?void 0:a.success)==null?void 0:x.category)||"",fabric:((j=a==null?void 0:a.success)==null?void 0:j.fabric)||"",sleeve:((N=a==null?void 0:a.success)==null?void 0:N.sleeve)||"",pattern:((y=a==null?void 0:a.success)==null?void 0:y.pattern)||"",color:((B=a==null?void 0:a.success)==null?void 0:B.color)||"",items:((C=a==null?void 0:a.success)==null?void 0:C.items)||"",price:((k=a==null?void 0:a.success)==null?void 0:k.price)||"",section:((q=a==null?void 0:a.success)==null?void 0:q.section)||"",about:((F=a==null?void 0:a.success)==null?void 0:F.about)||"",status:(($=a==null?void 0:a.success)==null?void 0:$.status)||"",description:((S=a==null?void 0:a.success)==null?void 0:S.description)||"",images:[]},validationSchema:H({brand_name:c().required("Brand name is required"),category:c().required("Category is required"),fabric:c().required("Fabric type is required"),sleeve:c().required("Sleeve type is required"),pattern:c().required("Pattern is required"),color:c().required("Color is required"),items:w().required("Number of items is required").positive().integer(),price:w().required("Price is required").positive(),section:c().required("Select section"),about:c().required("About product is required"),status:c().required("Status is required"),description:c().required("Description is required"),images:J().nullable().min(0).of(K().test("fileformat","Only jpg, jpeg, png are allowed",r=>!r||U.includes(r==null?void 0:r.type)))}),onSubmit:r=>{const l=new FormData;l.append("brand_name",r.brand_name),l.append("category",r.category),l.append("fabric",r.fabric),l.append("sleeve",r.sleeve),l.append("pattern",r.pattern),l.append("color",r.color),l.append("items",r.items),l.append("price",r.price),l.append("section",r.section),l.append("about",r.about),l.append("status",r.status),l.append("description",r.description),r.images&&r.images.length?r.images.forEach(n=>{l.append("photos",n)}):r.images&&l.append("photos",r.images),o(z({formData:l,token:t,id:h}))}}),I=r=>{const l=Array.from(r.target.files);e.setFieldValue("images",l);const n=l.map(m=>URL.createObjectURL(m));g(n)};return u.useEffect(()=>{i&&(i!=null&&i.success?(f("/products"),o(M(t)),p("Success",`${i==null?void 0:i.success}`,"success"),o(b())):i!=null&&i.status?(p("Error",`${i==null?void 0:i.status}`,"error"),o(b())):i!=null&&i.error&&(p("Error","internal server error","error"),o(b())))},[i,o,f]),s.jsx("div",{className:"p-3",children:s.jsxs("form",{action:"",className:"bg-light p-3",style:{borderRadius:"1rem"},onSubmit:e.handleSubmit,children:[s.jsx("h4",{className:"text-center text-decoration-underline",children:"Update Product"}),s.jsxs("div",{className:"row g-3",children:[s.jsxs("div",{className:"col-lg-4 col-md-6 col-sm-12 mb-3",children:[s.jsx("label",{htmlFor:"brand_name",className:"form-label",children:"Brand Name"}),s.jsx("input",{type:"text",name:"brand_name",value:e.values.brand_name,onChange:e.handleChange,onBlur:e.handleBlur,className:`form-control ${e.errors.brand_name&&e.touched.brand_name?"is-invalid":""}`,placeholder:"Enter brand name"}),s.jsx("div",{className:"invalid-feedback",children:e.errors.brand_name})]}),s.jsxs("div",{className:"col-lg-4 col-md-6 col-sm-12 mb-3",children:[s.jsx("label",{htmlFor:"category",className:"form-label",children:"Category"}),s.jsx("input",{type:"text",name:"category",value:e.values.category,onChange:e.handleChange,onBlur:e.handleBlur,className:`form-control ${e.errors.category&&e.touched.category?"is-invalid":""}`,placeholder:"Enter category"}),s.jsx("div",{className:"invalid-feedback",children:e.errors.category})]}),s.jsxs("div",{className:"col-lg-4 col-md-6 col-sm-12 mb-3",children:[s.jsx("label",{htmlFor:"fabric",className:"form-label",children:"Fabric"}),s.jsx("input",{type:"text",name:"fabric",value:e.values.fabric,onChange:e.handleChange,onBlur:e.handleBlur,className:`form-control ${e.errors.fabric&&e.touched.fabric?"is-invalid":""}`,placeholder:"Enter fabric"}),s.jsx("div",{className:"invalid-feedback",children:e.errors.fabric})]}),s.jsxs("div",{className:"col-lg-4 col-md-6 col-sm-12 mb-3",children:[s.jsx("label",{htmlFor:"sleeve",className:"form-label",children:"Sleeve"}),s.jsx("input",{type:"text",name:"sleeve",value:e.values.sleeve,onChange:e.handleChange,onBlur:e.handleBlur,className:`form-control ${e.errors.sleeve&&e.touched.sleeve?"is-invalid":""}`,placeholder:"Enter sleeve type"}),s.jsx("div",{className:"invalid-feedback",children:e.errors.sleeve})]}),s.jsxs("div",{className:"col-lg-4 col-md-6 col-sm-12 mb-3",children:[s.jsx("label",{htmlFor:"pattern",className:"form-label",children:"Pattern"}),s.jsx("input",{type:"text",name:"pattern",value:e.values.pattern,onChange:e.handleChange,onBlur:e.handleBlur,className:`form-control ${e.errors.pattern&&e.touched.pattern?"is-invalid":""}`,placeholder:"Enter pattern"}),s.jsx("div",{className:"invalid-feedback",children:e.errors.pattern})]}),s.jsxs("div",{className:"col-lg-4 col-md-6 col-sm-12 mb-3",children:[s.jsx("label",{htmlFor:"color",className:"form-label",children:"Color"}),s.jsx("input",{type:"text",name:"color",value:e.values.color,onChange:e.handleChange,onBlur:e.handleBlur,className:`form-control ${e.errors.color&&e.touched.color?"is-invalid":""}`,placeholder:"Enter color"}),s.jsx("div",{className:"invalid-feedback",children:e.errors.color})]}),s.jsxs("div",{className:"col-lg-4 col-md-6 col-sm-12 mb-3",children:[s.jsx("label",{htmlFor:"items",className:"form-label",children:"Number of Items"}),s.jsx("input",{type:"number",name:"items",value:e.values.items,onChange:e.handleChange,onBlur:e.handleBlur,className:`form-control ${e.errors.items&&e.touched.items?"is-invalid":""}`,placeholder:"Enter number of items"}),s.jsx("div",{className:"invalid-feedback",children:e.errors.items})]}),s.jsxs("div",{className:"col-lg-4 col-md-6 col-sm-12 mb-3",children:[s.jsx("label",{htmlFor:"price",className:"form-label",children:"Price"}),s.jsx("input",{type:"number",name:"price",value:e.values.price,onChange:e.handleChange,onBlur:e.handleBlur,className:`form-control ${e.errors.price&&e.touched.price?"is-invalid":""}`,placeholder:"Enter price"}),s.jsx("div",{className:"invalid-feedback",children:e.errors.price})]}),s.jsxs("div",{className:"col-lg-4 col-md-6 col-sm-12 mb-3",children:[s.jsx("label",{htmlFor:"section",className:"form-label",children:"Section"}),s.jsxs("select",{name:"section",value:e.values.section,onChange:e.handleChange,onBlur:e.handleBlur,className:`form-select ${e.errors.section&&e.touched.section?"is-invalid":""}`,children:[s.jsx("option",{value:"",children:"Select Section"}),s.jsx("option",{value:"mens wear",children:"Mens Wear"}),s.jsx("option",{value:"womens wear",children:"Womens Wear"}),s.jsx("option",{value:"footwear",children:"Footwear"})]}),s.jsx("div",{className:"invalid-feedback",children:e.errors.section})]}),s.jsxs("div",{className:"col-lg-6 col-md-6 col-sm-12 mb-3",children:[s.jsx("label",{htmlFor:"about",className:"form-label",children:"About Product"}),s.jsx("input",{type:"text",name:"about",value:e.values.about,onChange:e.handleChange,onBlur:e.handleBlur,className:`form-control ${e.errors.about&&e.touched.about?"is-invalid":""}`,placeholder:"Enter a short description"}),s.jsx("div",{className:"invalid-feedback",children:e.errors.about})]}),s.jsxs("div",{className:"col-lg-6 col-md-6 col-sm-12 mb-3",children:[s.jsx("label",{htmlFor:"status",className:"form-label",children:"Status"}),s.jsxs("select",{name:"status",value:e.values.status,onChange:e.handleChange,onBlur:e.handleBlur,className:`form-select ${e.errors.status&&e.touched.status?"is-invalid":""}`,children:[s.jsx("option",{value:"",children:"Select Status"}),s.jsx("option",{value:"in stock",children:"In Stock"}),s.jsx("option",{value:"only few left",children:"Only Few Left"}),s.jsx("option",{value:"out of stock",children:"Out of Stock"})]}),s.jsx("div",{className:"invalid-feedback",children:e.errors.status})]}),s.jsxs("div",{className:"col-12",children:[s.jsx("label",{htmlFor:"description",className:"form-label",children:"Description"}),s.jsx("textarea",{name:"description",value:e.values.description,onChange:e.handleChange,onBlur:e.handleBlur,className:`form-control ${e.errors.description&&e.touched.description?"is-invalid":""}`,placeholder:"Enter product description"}),s.jsx("div",{className:"invalid-feedback",children:e.errors.description})]}),s.jsxs("div",{className:"mb-3",children:[s.jsx("label",{htmlFor:"formFile",className:"form-label",children:"Product Images"}),s.jsx("input",{type:"file",multiple:!0,name:"images",onChange:I,onBlur:e.handleBlur,className:`form-control ${e.errors.images&&e.touched.images?"is-invalid":""}`}),s.jsx("div",{className:"invalid-feedback",children:e.errors.images})]}),(d==null?void 0:d.length)>0&&s.jsx("div",{className:"card",children:s.jsx("div",{className:"card-body row g-3",children:d.map((r,l)=>s.jsxs("div",{className:"col-lg-2 col-md-4 col-sm-12",children:[s.jsx("div",{className:"w-auto position-absolute",children:s.jsx("button",{type:"button",className:"text-danger fs-4",onClick:()=>{const n=e.values.images.filter((m,D)=>D!==l);e.setFieldValue("images",n),g(n.map(m=>URL.createObjectURL(m)))},children:s.jsx("i",{className:"fa-solid fa-rectangle-xmark"})})}),s.jsx("img",{src:r.startsWith("blob:")?r:`http://localhost:3000/${r}`,alt:`product-image-${l}`,className:"img-fluid"})]},l))})})]}),s.jsx("div",{className:"m-3 text-end",children:R?s.jsx(Q,{}):s.jsx("button",{type:"submit",className:"btn btn-success",children:"Update Product"})})]})})});P.displayName="Update_Products_Form";const ee=()=>(u.useEffect(()=>{document.title="Ecom | Update Product"},[]),s.jsxs("div",{className:"min-vh-100 w-100",style:{backgroundColor:"rgba(217,217,217)"},children:[s.jsx(X,{}),s.jsx(P,{})]}));export{ee as default};
