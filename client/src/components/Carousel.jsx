import React from 'react';
import carousel1 from "../assets/carousel1.webp";
import carousel2 from "../assets/carousel2.webp";
import carousel3 from "../assets/carousel3.webp";

const Carousel = React.memo(() => {
  return (
    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={carousel1} className="d-block w-100" alt="..." style={{height:'500px', imageRendering:'pixelated'}} loading='lazy'/>
    </div>
    <div className="carousel-item">
      <img src={carousel2} className="d-block w-100" alt="..." style={{height:'500px', imageRendering:'pixelated'}} loading='lazy'/>
    </div>
    <div className="carousel-item">
      <img src={carousel3} className="d-block w-100" alt="..." style={{height:'500px', imageRendering:'pixelated'}} loading='lazy'/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  )
})
Carousel.displayName = 'Carousel'
export default Carousel