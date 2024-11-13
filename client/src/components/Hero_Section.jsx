import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../redux/api";
import Skeleton from 'react-loading-skeleton';
import swal from "sweetalert";
import { cleargetproductresponse } from "../redux/slices";
import imageloader from "../assets/cardloader.webp";

const Hero_Section = React.memo(() => {

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const {loading, data} = useSelector((state)=>state.getproductslice);

  useEffect(()=>{
    if(token){
      dispatch(getproducts(token))
    }
  },[token, dispatch]);

  useEffect(()=>{
    if(data){
      if(data?.error){
        dispatch(cleargetproductresponse());
        swal('Error','internal server error','error');
      }
    }
  },[data, dispatch]);

  return (
    <div
      className="container-fluid min-vh-100 w-100 p-1"
      style={{ backgroundColor: "rgb(217, 217, 217)" }}
    >
      
{ data?.success?.length >0 ? (
  data?.success?.map((category,index)=>(
<div className="mens bg-light p-3 mb-3 mt-3" key={index}>
  <div className="d-flex justify-content-between align-items-center">
    <h4 className="m-3">{category.category}</h4>
    <Link to={`/${category.category}`}>more</Link>
  </div>
  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-4">
    { category.products.map((product,index)=>(
      <div className="col" key={index}>
      <Link className="card h-100" to={`/description/${product?._id}`}>
        <img
          src={loading ? imageloader:  `https://ecom-lwfl.onrender.com:3000/${product.images[0]}`}
          className="card-img-top"
          alt={product.about}
          loading="lazy"
          style={{ height: "300px", imageRendering: "pixelated" }}
        />
        <div className="card-body">
          <p className="card-text">{ loading ? <Skeleton/> : product.about }</p>
          <p className="card-text">
            { loading ? <Skeleton/> :(
              <span className="d-flex justify-content-between align-items-center flex-wrap">
                <span>
            <i className="fa-solid fa-indian-rupee-sign"></i> {loading ? <Skeleton/> : product.price}
            </span>
            <span>
            <small className={`card-text ${loading ? '' : (product.status === 'in stock' ? 'text-success' : product.status === 'only few left' ? 'text-secondary' : 'text-danger')}`}>
  {loading ? <Skeleton /> : product.status}
</small>
            </span>
            </span>
            )}
          </p>
        </div>
      </Link>
    </div>
    ))}                   
  </div>
</div>
  ))
):(
  <p className="text-danger d-flex align-items-center justify-content-center min-vh-100">no data found</p>
)}
     
      
    </div>
  );
});
Hero_Section.displayName = "Hero_Section";
export default Hero_Section;