import{R as x,j as e,u,a as g,r as o,h as v,i as b,s as h,L as m,b as y,f as w,k}from"./index-02v5Kx9p.js";import{N as E}from"./Navs-C4xq8lsz.js";import{S as n}from"./index-DmWVH89f.js";import{i as R}from"./cardloader-DztRGZ-7.js";const S="/assets/carousel1-Dlq2mp7k.webp",C="/assets/carousel2-9wksfZ5Q.webp",H="/assets/carousel3-CHVaguyC.webp",p=x.memo(()=>e.jsxs("div",{id:"carouselExampleAutoplaying",className:"carousel slide","data-bs-ride":"carousel",children:[e.jsxs("div",{className:"carousel-inner",children:[e.jsx("div",{className:"carousel-item active",children:e.jsx("img",{src:S,className:"d-block w-100",alt:"...",style:{height:"500px",imageRendering:"pixelated"},loading:"lazy"})}),e.jsx("div",{className:"carousel-item",children:e.jsx("img",{src:C,className:"d-block w-100",alt:"...",style:{height:"500px",imageRendering:"pixelated"},loading:"lazy"})}),e.jsx("div",{className:"carousel-item",children:e.jsx("img",{src:H,className:"d-block w-100",alt:"...",style:{height:"500px",imageRendering:"pixelated"},loading:"lazy"})})]}),e.jsxs("button",{className:"carousel-control-prev",type:"button","data-bs-target":"#carouselExampleAutoplaying","data-bs-slide":"prev",children:[e.jsx("span",{className:"carousel-control-prev-icon","aria-hidden":"true"}),e.jsx("span",{className:"visually-hidden",children:"Previous"})]}),e.jsxs("button",{className:"carousel-control-next",type:"button","data-bs-target":"#carouselExampleAutoplaying","data-bs-slide":"next",children:[e.jsx("span",{className:"carousel-control-next-icon","aria-hidden":"true"}),e.jsx("span",{className:"visually-hidden",children:"Next"})]})]}));p.displayName="Carousel";const j=x.memo(()=>{var i,d;const r=u(),t=localStorage.getItem("token"),{loading:l,data:s}=g(c=>c.getproductslice);return o.useEffect(()=>{t&&r(v(t))},[t,r]),o.useEffect(()=>{s&&s!=null&&s.error&&(r(b()),h("Error","internal server error","error"))},[s,r]),e.jsx("div",{className:"container-fluid min-vh-100 w-100 p-1",style:{backgroundColor:"rgb(217, 217, 217)"},children:((i=s==null?void 0:s.success)==null?void 0:i.length)>0?(d=s==null?void 0:s.success)==null?void 0:d.map((c,f)=>e.jsxs("div",{className:"mens bg-light p-3 mb-3 mt-3",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center",children:[e.jsx("h4",{className:"m-3",children:c.category}),e.jsx(m,{to:`/${c.category}`,children:"more"})]}),e.jsx("div",{className:"row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-4",children:c.products.map((a,N)=>e.jsx("div",{className:"col",children:e.jsxs(m,{className:"card h-100",to:`/description/${a==null?void 0:a._id}`,children:[e.jsx("img",{src:l?R:`https://ecom-lwfl.onrender.com:3000/${a.images[0]}`,className:"card-img-top",alt:a.about,loading:"lazy",style:{height:"300px",imageRendering:"pixelated"}}),e.jsxs("div",{className:"card-body",children:[e.jsx("p",{className:"card-text",children:l?e.jsx(n,{}):a.about}),e.jsx("p",{className:"card-text",children:l?e.jsx(n,{}):e.jsxs("span",{className:"d-flex justify-content-between align-items-center flex-wrap",children:[e.jsxs("span",{children:[e.jsx("i",{className:"fa-solid fa-indian-rupee-sign"})," ",l?e.jsx(n,{}):a.price]}),e.jsx("span",{children:e.jsx("small",{className:`card-text ${l?"":a.status==="in stock"?"text-success":a.status==="only few left"?"text-secondary":"text-danger"}`,children:l?e.jsx(n,{}):a.status})})]})})]})]})},N))})]},f)):e.jsx("p",{className:"text-danger d-flex align-items-center justify-content-center min-vh-100",children:"no data found"})})});j.displayName="Hero_Section";const _=()=>{o.useEffect(()=>{document.title="Ecom | Home"},[]);const r=u(),t=y(),{loading:l,data:s}=g(i=>i.userdata);return o.useEffect(()=>{s&&s!=null&&s.error&&(t("/"),h("Error","internal server error","error"),localStorage.removeItem("token"),r(w()))},[s,r,t]),l?e.jsx(k,{}):e.jsxs(e.Fragment,{children:[e.jsx(E,{}),e.jsx(p,{}),e.jsx(j,{})]})};export{_ as default};
