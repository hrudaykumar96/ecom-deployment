import { useEffect } from "react";
import Product_info from "../components/Product_info";
import Product_Description from "../components/Product_Description";
import Related_Products from "../components/Related_Products";
import Product_Image_FullView from "../components/Product_Image_FullView";
import Ratings from "../components/Ratings";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getproductsinfo } from "../redux/api";
import swal from "sweetalert";
import { clearproductsinfoslice } from "../redux/slices";

const Product = () => {

  /* document title */
  useEffect(()=>{
    document.title = 'Ecom | Product'
  },[]);

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const { loading, data } = useSelector((state)=>state.getproductsinfoslice);

  useEffect(()=>{
    if(token && id){
      dispatch(getproductsinfo({token, id}))
    }
  },[token, id, dispatch]);

  useEffect(()=>{
    if(data){
      if(data?.status){
        swal('Error', `${data?.status}`,'error')
        dispatch(clearproductsinfoslice())
      } else if(data?.error){
        swal('Error','internal server error', 'error')
        dispatch(clearproductsinfoslice())
      }
    }
  },[data, dispatch]);

  return (
    <div className='min-vh-100 w-100' style={{backgroundColor:"rgba(217,217,217)"}}>
      <Product_Image_FullView data={data}/>
      <div className="container p-1">
      <Product_info loading={loading} data={data}/>
      <Product_Description loading={loading} data={data}/>
      <Ratings id={id} token={token}/>
      </div>
      <Related_Products loading={loading} data={data}/>      
    </div>
  )
}

export default Product