import { useEffect, useState } from "react";
import Navs from "../components/Navs";
import Seller_Management_Section from "../components/Seller_Management_Section";
import Update_Seller from "../forms/Update_Seller";
import { useDispatch, useSelector } from "react-redux";
import { getsellerdatabyid } from "../redux/api";

const Seller_Management = () => {

  /* document title */
  useEffect(()=>{
    document.title = 'Ecom | Seller Management'
  },[]);

  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const data = useSelector((state)=>state.getsellerdataslicebyid.data);

  useEffect(()=>{
    if(token && id){
      dispatch(getsellerdatabyid({token, id}))
    }
  },[token, id, dispatch]);
  
  return (
    <div className="min-vh-100 w-100" style={{backgroundColor:'rgba(217,217,217'}}>
        <Navs/>
        <Seller_Management_Section setId={setId}/>
        <Update_Seller data={data}/>
    </div>
  )
}

export default Seller_Management