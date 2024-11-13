import Navs from "../components/Navs";
import Filtering from "../components/Filtering";
import Mensection from "../components/Mensection";
import { useEffect, useState } from "react";
import propTypes from "prop-types";

const Menswear = ({ search }) => {

  /* document title */
  useEffect(()=>{
    document.title = "Ecom | Men's Wear"
  },[]);

  const [filterData, setFilterData] = useState({
    color: '',
    brand_name: '',
    category: '',
    price_from: '',
    price_to: '',
  });
  
  return (
    <>
    <Navs/>
    <Filtering filterData={filterData} setFilterData={setFilterData}/>
    <Mensection filterData={filterData} search={search}/>
    </>
  )
}
Menswear.propTypes={
  search:propTypes.any
}
export default Menswear