import { useEffect, useState } from "react";
import Navs from "../components/Navs";
import Footwearsection from "../components/Footwearsection";
import Filtering from "../components/Filtering";
import propTypes from "prop-types";

const Footwear = ({ search }) => {
  /* document title */
  useEffect(()=>{
    document.title = "Ecom | Footwear"
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
    <Footwearsection filterData={filterData} search={search}/>
    <Filtering filterData={filterData} setFilterData={setFilterData}/>
    </>
  )
}
Footwear.propTypes={
  search: propTypes.any
}
export default Footwear