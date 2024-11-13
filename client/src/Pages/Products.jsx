import { useEffect } from "react";
import Navs from "../components/Navs";
import Products_Section from "../components/Products_Section";

const Products = () => {

  /* document title */
  useEffect(()=>{
    document.title = 'Ecom | Products Management'
  },[]);
  
  return (
    <div className="min-vh-100 w-100" style={{backgroundColor:'rgba(217,217,217'}}>
        <Navs/>
        <Products_Section/>
    </div>
  )
}

export default Products