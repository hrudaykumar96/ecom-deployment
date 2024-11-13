import { useEffect } from "react";
import Navs from "../components/Navs";
import Update_Products_Form from "../forms/Update_Products_Form";

const Update_Products = () => {

  /* document title */
  useEffect(()=>{
    document.title = 'Ecom | Update Product'
  },[]);
  
  return (
    <div className="min-vh-100 w-100" style={{backgroundColor:'rgba(217,217,217)'}}>
        <Navs/>
        <Update_Products_Form/>
    </div>
  )
}

export default Update_Products