import { useEffect, useState } from "react";
import Navs from "../components/Navs";
import Womensection from "../components/Womensection";
import Filtering from "../components/Filtering";
import propTypes from "prop-types";

const Womenswear = ({search}) => {
  /* document title */
  useEffect(()=>{
    document.title = "Ecom | Women's Wear"
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
    <Womensection filterData={filterData} search={search}/>
    <Filtering filterData={filterData} setFilterData={setFilterData}/>
    </>
  )
}
Womenswear.propTypes={
  search:propTypes.any
}
export default Womenswear