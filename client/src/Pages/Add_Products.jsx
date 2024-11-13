import { useEffect } from "react";
import Navs from "../components/Navs";
import Add_Products_Form from "../forms/Add_Products_Form";

const Add_Products = () => {

  /* document title */
  useEffect(()=>{
    document.title = 'Ecom | Add Products'
  },[]);
  
  return (
    <div className="min-vh-100 w-100" style={{backgroundColor:'rgba(217,217,217'}}>
        <Navs/>
        <Add_Products_Form/>
    </div>
  )
}

export default Add_Products