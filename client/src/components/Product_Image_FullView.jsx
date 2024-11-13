import React from 'react';
import propTypes from "prop-types";
const Product_Image_FullView = React.memo(({data}) => {
  return (
<div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-fullscreen-sm-down modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5 text-truncate" id="exampleModalLabel">{data?.success?.description}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    { data?.success?.images?.length && data?.success?.images?.map((image,index)=>(
          <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
    <img src={`https://ecom-lwfl.onrender.com/${image}`} className="d-block w-100" style={{cursor:'pointer', imageRendering:'pixelated', height:'268px'}} alt="..." loading='lazy' data-bs-toggle="modal" data-bs-target="#imageModal"/>
        </div>
    ))}
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  )
})
Product_Image_FullView.displayName = 'Product_Image_FullView'
Product_Image_FullView.propTypes={
  data:propTypes.any
}
export default Product_Image_FullView