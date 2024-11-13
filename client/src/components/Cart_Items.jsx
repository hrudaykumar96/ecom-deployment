import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import imageloader from "../assets/cardloader.webp";
import propTypes from "prop-types";
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getcartdata, removecartdata } from '../redux/api';
import swal from 'sweetalert';
import { cleardeletecartitem } from '../redux/slices';

const Cart_Items = React.memo(({ cart_loading, cart_data }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const response = useSelector((state)=>state.deletecartitemslice.response);
  
  const deleteproduct=({id, quantity, size, price})=>{
    if(token){
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover",
        icon: "warning", 
        buttons: ["No, cancel plx!", "Yes, delete it!"], 
      })
      .then((isConfirm) => {
        if (isConfirm) {
          dispatch(removecartdata({token, id, quantity, size, price}))
          swal("Deleted!", 'product removed successfully', "success");
          dispatch(cleardeletecartitem());
        } else {
          swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });
 
    }
  }

  useEffect(()=>{
    if(response && token){
      if(response?.success){
        dispatch(getcartdata(token));
      }
    }
  },[token, response, dispatch])


  const products = cart_data?.success?.[0]?.products || [];

  return (
    <div className='container pt-3 pb-3 ps-auto pe-auto'>

        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="card mb-3" style={{ maxWidth: '100%' }} key={index}>
            <div className="row g-0">
              <div className="col-md-4">
                <Link to={`/description/${product.product?._id}`}>
                  <img
                    src={cart_loading ? imageloader : `https://ecom-lwfl.onrender.com/${product.product?.images[0]}`}
                    className="img-fluid rounded-start w-100"
                    style={{ height: "300px", objectFit: "fill", imageRendering: 'pixelated' }}
                    alt={product?.product?.name || "Product Image"}
                    loading='lazy'
                  />
                </Link>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p className="card-text">{cart_loading ? <Skeleton/> : product?.product?.about}</p>
                  <div className="card-text">
                    

<p>Quantity: {cart_loading? <Skeleton/> : product?.quantity}</p>
                  </div>
                  <small>Size: {cart_loading ? <Skeleton/> : product?.size}</small>
                  <p className="card-text">
                    <i className="fa-solid fa-indian-rupee-sign"></i> {cart_loading ? <Skeleton/> : product?.product?.price }
                  </p>
                  <p className="card-text">
                    <button type="button" className="btn btn-secondary" onClick={()=>deleteproduct({id: product.product?._id,quantity:product?.quantity, size:product?.size, price: product?.product?.price})}>
                      Remove
                    </button>
                  </p>
                </div>
              </div>
            </div>
            </div>
          ))
        ) : (
          <p>No products in the cart</p>
        )}
    </div>
  );
});

Cart_Items.displayName = 'Cart_Items';

Cart_Items.propTypes = {
  cart_data: propTypes.object,
  cart_loading: propTypes.bool,
};

export default Cart_Items;
