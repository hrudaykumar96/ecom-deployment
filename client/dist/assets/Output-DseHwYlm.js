import{r as l,q as x,a as f,u as p,t as j,j as t}from"./index-02v5Kx9p.js";import{S as d}from"./index-DmWVH89f.js";const b=()=>{var i,r;l.useEffect(()=>{document.title="Ecom | Output"},[]);const{id:e}=x(),c=localStorage.getItem("token"),{loading:o,data:s}=f(a=>a.getnotificationbyidslice),n=p();l.useEffect(()=>{c&&e&&n(j({token:c,id:e}))},[c,e,n]);const u=a=>{const m={year:"numeric",month:"long",day:"numeric"};return new Date(a).toLocaleDateString("en-GB",m)};return t.jsx("div",{className:"min-vh-100 p-auto pt-3 pb-3",style:{backgroundColor:"rgb(217, 217, 217)"},children:t.jsx("div",{className:"container",children:t.jsxs("div",{className:"card",children:[t.jsx("div",{className:"card-body",style:{textAlign:"justify"},children:o?t.jsx(d,{count:10}):(i=s==null?void 0:s.success)==null?void 0:i.notification}),t.jsx("div",{className:"card-footer",children:t.jsx("p",{className:"card-text",children:t.jsx("small",{className:"text-body-secondary",children:o?t.jsx(d,{}):u((r=s==null?void 0:s.success)==null?void 0:r.createdAt)})})})]})})})};export{b as default};