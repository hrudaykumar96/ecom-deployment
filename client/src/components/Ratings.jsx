import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getproductratings } from '../redux/api';
import propTypes from "prop-types";
import Skeleton from 'react-loading-skeleton';

const Ratings = React.memo(({id, token}) => {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state)=>state.getratingslice);
  
  useEffect(()=>{
    if(load){
      dispatch(getproductratings({token, id}))
    }
  },[load, token, id, dispatch]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };
  return (
    <div className="accordion accordion-flush mt-3" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" onClick={()=>setLoad(true)} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne1" aria-expanded="false" aria-controls="flush-collapseOne1">
      Ratings & Reviews
      </button>
    </h2>
    <div id="flush-collapseOne1" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      <div className="card">
        <div className="card-header">
        {loading ? <Skeleton/> : data?.average} <i className="fa-solid fa-star text-warning"></i> rating
        </div>
  <ul className="list-group list-group-flush">
    {data?.success?.length > 0 ? (
       data?.success?.map((rating, index)=>(
        <li className="list-group-item" key={index}>
          { loading ? <Skeleton count={5}/> :(
            <>
        {rating?.reviews[0]?.rating} <i className="fa-solid fa-star text-warning"></i> <small>{rating?.reviews[0]?.user?.name}</small>
        <p style={{textAlign:'justify'}}>{rating?.reviews[0]?.review}</p>
        <small className='text-secondary'>{formatDate(rating?.updatedAt)}</small>
        </>
          )}
        </li>
      ))
    ) : (
      <p className='text-center text-danger'>no ratings found</p>
    )}

  </ul>
</div>
      </div>
    </div>
  </div>
</div>
  )
})
Ratings.displayName = 'Ratings'
Ratings.propTypes={
  id: propTypes.any,
  token:propTypes.string
}
export default Ratings