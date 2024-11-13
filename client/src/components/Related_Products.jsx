import React from 'react';
import { Link } from 'react-router-dom';
import imageloader from "../assets/cardloader.webp";
import propTypes from "prop-types"
import Skeleton from 'react-loading-skeleton';

const Related_Products = React.memo(({loading, data}) => {
  return (
<div className="container-fluid pt-3 pb-3">
  { data?.similarProducts?.length >0 && (
    <>
    <h5 className="text-center">similar products</h5>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-6 g-4">
        { data?.similarProducts?.map((product, index)=>(
          <div className="col" key={index}>
            <Link className="card h-100" to={`/description/${product._id}`}>
              <img
         src={loading ? imageloader:  `https://ecom-lwfl.onrender.com/${product.images[0]}`}
                className="card-img-top"
                alt={product.about}
                loading="lazy"
                style={{ height: "300px", imageRendering: "pixelated" }}
              />
              <div className="card-body">
                <p className="card-text">{loading ? <Skeleton/> : product.about}</p>
                <p className="card-text">
            { loading ? <Skeleton/> :(
              <span className="d-flex justify-content-between align-items-center flex-wrap">
                <span>
            <i className="fa-solid fa-indian-rupee-sign"></i> {loading ? <Skeleton/> : product.price}
            </span>
            <span>
            <small className={`card-text ${loading ? '' : (product.status === 'in stock' ? 'text-success' : product.status === 'only few left' ? 'text-secondary' : 'text-danger')}`}>
  {loading ? <Skeleton /> : product.status}
</small>
            </span>
            </span>
            )}
          </p>
              </div>
            </Link>
          </div>
        ))}
        </div>
        </>
  )}
        
        </div>
  )
})
Related_Products.displayName = 'Related_Products'
Related_Products.propTypes={
  data:propTypes.any,
  loading:propTypes.bool,
}
export default Related_Products