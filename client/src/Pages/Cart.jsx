import Cart_Items from "../components/Cart_Items";
import Profile_Details from "../components/Profile_Details";
import AddressForm from "../forms/AddressForm";
import Payment_Details from "../components/Payment_Details";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../effects/Loader";
import { getcartdata } from "../redux/api";
import swal from "sweetalert";
import { cleargetcartdata } from "../redux/slices";

const Cart = () => {

  /* document title */
  useEffect(()=>{
    document.title = 'Ecom | Cart'
  },[]);

  /* user data */
  const { loading, data } = useSelector((state)=>state.userdata);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const cart_loading = useSelector((state)=>state.getcartdataslice.loading);
  const cart_data = useSelector((state)=>state.getcartdataslice.data);

  useEffect(()=>{
    if(token){
      dispatch(getcartdata(token))
    }
  },[token, dispatch]);

  useEffect(()=>{
    if(cart_data){
      if(cart_data?.error){
        swal('Error', 'internal server error', 'error');
        dispatch(cleargetcartdata());
      }
    }
  },[dispatch, cart_data]);

  if(loading){
    return (<Loader/>)
  }
  
  return (
    <div className="min-vh-100" style={{backgroundColor:'rgba(217,217,217'}}>
      { cart_data?.success?.length >0 ? (
        <>
                <Cart_Items cart_loading={cart_loading} cart_data={cart_data}/>
        <Profile_Details data={data}/>
        <AddressForm data={data}/>
        <Payment_Details cart_loading={cart_loading} cart_data={cart_data}/>
        </>
      ):
      <p className="text-danger text-center w-100 pt-3">cart is empty</p>
      }

    </div>
  )
}
export default Cart