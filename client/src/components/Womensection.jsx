import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Skeleton from 'react-loading-skeleton';
import imageloader from "../assets/cardloader.webp";
import { useDispatch, useSelector } from "react-redux";
import { getproductsbycategory } from "../redux/api";
import { cleargetproductresponsebycategory } from '../redux/slices';
import propTypes from "prop-types";

const Womensection = React.memo(({filterData, search}) => {

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const {loading, data} = useSelector((state)=>state.getproductslicebycategory);

  useEffect(()=>{
    if(token){
      dispatch(getproductsbycategory({token, category:'womens wear'}))
    }
  },[token, dispatch]);

  useEffect(()=>{
    if(data){
      if(data?.error){
        dispatch(cleargetproductresponsebycategory());
        swal('Error','internal server error','error');
      }
    }
  },[data, dispatch]);

  const filterProducts = () => {
    if (!data?.success) return [];

    let filtered = data?.success;

    // Apply category filter if `filterData.category` is available
    if (filterData?.category) {
      filtered = filtered.filter((product) => {
        const category = product.category ? product.category.toLowerCase() : '';
        return category.includes(filterData.category.toLowerCase());
      });
    }

    // Apply the color filter if `filterData.color` is available
    if (filterData?.color) {
      filtered = filtered.filter((product) => {
        const color = product.color ? product.color.toLowerCase() : '';
        return color.includes(filterData.color.toLowerCase());
      });
    }

    // Apply the brand filter if `filterData.brand_name` is available
    if (filterData?.brand_name) {
      filtered = filtered.filter((product) => {
        const brand = product.brand_name ? product.brand_name.toLowerCase() : '';
        return brand.includes(filterData.brand_name.toLowerCase());
      });
    }

    // Apply the price range filter if `filterData.price_from` and `filterData.price_to` are available
    if (filterData?.price_from && filterData?.price_to) {
      filtered = filtered.filter((product) => {
        const price = product.price ? parseFloat(product.price) : 0;
        return price >= parseFloat(filterData.price_from) && price <= parseFloat(filterData.price_to);
      });
    }
    if (search) {
      filtered = filtered.filter((product) =>
        product.about?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  };
  const filteredProducts = filterProducts();

  return (
    <div
      className="container-fluid min-vh-100 pt-1 pb-1"
      style={{ backgroundColor: "rgb(217, 217, 217)" }}
    >
      <button className="btn fs-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
      <i className="fa-solid fa-bars"></i>
</button>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-4">
        { filteredProducts.length >0 ? (
          filteredProducts.map((product, index)=>(
<div className="col" key={index}>
          <Link className="card h-100" to={`/description/${product?._id}`}>
            <img
src={loading ? imageloader : `https://ecom-lwfl.onrender.com:3000/${product?.images[0]}`}
              className="card-img-top"
              alt="..."
              loading="lazy"
              style={{ height: "300px", imageRendering: "pixelated" }}
            />
            <div className="card-body">
              <p className="card-text">{loading ? <Skeleton/> : product.about}</p>
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
          ))
        ) : (
          <p className='text-danger d-flex align-items-center justify-content-center min-vh-100 w-100'>no data found</p>
        ) }
        
      </div>
    </div>
  )
});
Womensection.displayName = 'Womensection'
Womensection.propTypes={
  filterData:propTypes.any,
  search:propTypes.any,
}
export default Womensection