import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import imageloader from "../assets/cardloader.webp";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { addproductstocart, getcartdata } from "../redux/api";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { clearaddproducttocartresponse } from "../redux/slices";
import ButtonLoader from "../effects/ButtonLoader";

const Product_info = React.memo(({ loading, data }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { id } = useParams();
  const cart_loader = useSelector(
    (state) => state.addproducttocartslice.loading
  );
  const response = useSelector((state) => state.addproducttocartslice.response);
  const [size, setSize] = useState("s");
  const [quantity, setQuantity] = useState(1);
  const items = [
    {
      product: id,
      quantity,
      size,
    },
  ];

  const addtocart = () => {
    if (token) {
      dispatch(addproductstocart({ items, token }));
    }
  };

  useEffect(() => {
    if (response) {
      if (response?.success) {
        swal("Success", `${response?.success}`, "success");
        setSize('s'); setQuantity(1);
        dispatch(clearaddproducttocartresponse());
        dispatch(getcartdata(token));
      } else if (response?.error) {
        swal("Error", "internal server error", "error");
        dispatch(clearaddproducttocartresponse());
      }
    }
  }, [response, dispatch]);
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <div id="carouselExample1" className="carousel slide">
            <div className="carousel-inner">
              {loading ? (
                <img
                  src={imageloader}
                  className="d-block w-100"
                  style={{ height: "268px" }}
                />
              ) : (
                data?.success?.images?.map((image, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={index}
                  >
                    <img
                      src={`https://ecom-lwfl.onrender.com/${image}`}
                      className="d-block w-100"
                      style={{
                        cursor: "pointer",
                        imageRendering: "pixelated",
                        height: "268px",
                      }}
                      alt="..."
                      loading="lazy"
                      data-bs-toggle="modal"
                      data-bs-target="#imageModal"
                    />
                  </div>
                ))
              )}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample1"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample1"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <p className="card-text">
              {loading ? <Skeleton /> : data?.success?.about}
            </p>
            {loading ? (
              <Skeleton />
            ) : (
              <p className="card-text">
                quantity:{" "}
                <select
                  className="form-select form-select-sm w-25"
                  aria-label="Small select example"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  <option defaultValue="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </p>
            )}

            {loading ? (
              <Skeleton />
            ) : (
              <select
                className="form-select form-select-sm w-50"
                aria-label="Small select example"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option defaultValue="s">Select Size</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select>
            )}
            <p className="card-text mt-3">
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                  {data?.success?.price || <Skeleton />}
                </>
              )}
            </p>
          </div>
          <div className="card-footer d-flex align-items-center justify-content-between">
            {loading ? (
              <Skeleton />
            ) : (
              <>
                {cart_loader ? (
                  <ButtonLoader />
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={addtocart}
                      disabled={data?.success?.status === "out of stock"}
                    >
                      add to cart
                    </button>
                  </>
                )}
              </>
            )}
            <small
              className={`${
                data?.success?.status === "in stock"
                  ? "text-success"
                  : data?.success?.status === "only few left"
                  ? "text-secondary"
                  : "text-danger"
              }`}
            >
              {loading ? <Skeleton /> : data?.success?.status}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
});
Product_info.displayName = "Product_info";
Product_info.propTypes = {
  data: propTypes.any,
  loading: propTypes.bool,
};
export default Product_info;