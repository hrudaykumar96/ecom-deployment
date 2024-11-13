import React from "react";
import logo from "../assets/logo.webp";
import propTypes from "prop-types";

const Filtering = React.memo(({filterData, setFilterData}) => {


  // Handle changes in any form field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <img
          src={logo}
          className="offcanvas-title img-fluid h-50"
          id="offcanvasExampleLabel"
          alt="logo"
        />
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <h5 className="m-3">Filters</h5>
      <div className="offcanvas-body">
        <div className="mb-3">
          <label htmlFor="color" className="form-label">
            Color
          </label>
          <input
            type="text"
            id="color"
            name="color"
            className="form-control"
            value={filterData?.color}
            placeholder="Enter color of your choice"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brand_name" className="form-label">
            Brand Name
          </label>
          <input
            type="text"
            id="brand_name"
            name="brand_name"
            className="form-control"
            value={filterData?.brand_name}
            placeholder="Enter brand name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <div className="d-flex">
            <input
              type="number"
              id="price_from"
              name="price_from"
              className="form-control"
              value={filterData?.price_from}
              placeholder="From"
              onChange={handleChange}
            />
            <input
              type="number"
              id="price_to"
              name="price_to"
              className="form-control"
              value={filterData?.price_to}
              placeholder="To"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={filterData?.category}
            placeholder="Enter category of your choice"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
});

Filtering.displayName = "Filtering";
Filtering.propTypes={
  filterData:propTypes.any,
  setFilterData:propTypes.any
}
export default Filtering;