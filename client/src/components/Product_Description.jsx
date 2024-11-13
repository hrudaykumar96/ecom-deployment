import React from 'react'
import propTypes from "prop-types";
import Skeleton from 'react-loading-skeleton';
const Product_Description = React.memo(({loading, data}) => {
  return (

        <div className="accordion accordion-flush" id="accordionFlushExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        product description
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">
        { loading ? <Skeleton count={10}/> :(
          <div className="card mb-3">
  <div className="card-body">
    <p style={{textAlign:'justify'}}>{data?.success?.description}</p>
    <div className="box">
    <div className="d-flex justify-content-between">
      <strong>fabric</strong>
      <p>{data?.success?.fabric}</p>
    </div>
    <div className="d-flex justify-content-between">
      <strong>sleeve</strong>
      <p>f{data?.success?.sleeve}</p>
    </div>
    <div className="d-flex justify-content-between">
      <strong>pattern</strong>
      <p>{data?.success?.pattern}</p>
    </div>
    <div className="d-flex justify-content-between">
      <strong>color</strong>
      <p>{data?.success?.color}</p>
    </div>
    <div className="d-flex justify-content-between">
      <strong>number of items</strong>
      <p>{data?.success?.items}N</p>
    </div>
    </div>
  </div>
</div>
        )}
      
      </div>
    </div>
  </div>
</div>
  )
})
Product_Description.displayName = 'Product_Description'
Product_Description.propTypes={
  loading: propTypes.bool,
  data: propTypes.any
}
export default Product_Description