import React, { useEffect } from 'react'
import propTypes from "prop-types";
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getcartdata, placeorder } from '../redux/api';
import swal from 'sweetalert';
import { clearplaceorder } from '../redux/slices';

const Payment_Details = React.memo(({cart_loading, cart_data}) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const response = useSelector((state)=>state.placeorderslice.response);

  const place_order=()=>{
    if(token){
      dispatch(placeorder(token))
    }
  }

  useEffect(()=>{
    if(response){
      if(response?.success){
        dispatch(getcartdata(token))
        swal('Success','order placed successfully','success');
        dispatch(clearplaceorder());
      } else if(response?.error){
        swal('Error','internal server error','error');
        dispatch(clearplaceorder());
      }
    }
  },[response, dispatch, token]);

  return (
    <div className='container pb-3 ps-auto pe-auto'>
        <div className="card" style={{maxWidth:'30rem'}}>
        <div className="card-header">
    price details
  </div>
  <div className="card-body">
    <div className="d-flex justify-content-between">
      <strong>price:</strong><p><i className="fa-solid fa-indian-rupee-sign"></i> {cart_loading ? <Skeleton/> : cart_data?.success[0]?.price}</p>
    </div>
    <div className="d-flex justify-content-between">
      <strong>delivery charges:</strong><p> <i className="fa-solid fa-indian-rupee-sign"></i> {cart_loading ? <Skeleton/> : cart_data?.success[0]?.delivery_charges}</p>
    </div>
    <div className="d-flex justify-content-between">
      <strong>total:</strong><p><i className="fa-solid fa-indian-rupee-sign"></i> {cart_loading ? <Skeleton/> : cart_data?.success[0]?.total_price}</p>
    </div>
  </div>
  <div className="card-footer">
    <button type="button" className='btn btn-warning text-light' onClick={place_order} style={{backgroundColor:'#fb641b'}}>place order</button>
  </div>
</div>
    </div>
  )
})
Payment_Details.displayName = 'Payment_Details'
Payment_Details.propTypes={
  cart_data: propTypes.any,
  cart_loading: propTypes.bool
}
export default Payment_Details