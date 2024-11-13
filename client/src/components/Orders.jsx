import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import imageloader from "../assets/cardloader.webp";
import { useDispatch, useSelector } from "react-redux";
import { getordersdata, postreview } from '../redux/api';
import Skeleton from 'react-loading-skeleton';
import swal from 'sweetalert';
import { clearpostrating } from '../redux/slices';

const Orders = React.memo(() => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { loading, data } = useSelector((state) => state.getorderslice);
  const response = useSelector((state) => state.postratingslice.response);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };

  useEffect(() => {
    if (token) {
      dispatch(getordersdata(token));
    }
  }, [token, dispatch]);

  // Handle form submission for a review
  const handleReviewSubmit = (values, productId) => {
    dispatch(postreview({ token, id: productId, values }));
  };

  useEffect(() => {
    if (response) {
      if (response?.success) {
        swal('Success', `${response?.success}`, 'success');
        dispatch(clearpostrating());
        dispatch(getordersdata(token));
      }
      if (response?.error) {
        swal('Error', 'internal server error', 'error');
        dispatch(clearpostrating());
      }
    }
  }, [response, dispatch, token]);

  return (
    <div className="container pt-3 pb-3">
      {/* Render orders only if there is data */}
      {data?.success?.length > 0 && (
        <>
          <h5 className="text-center">My Orders</h5>
          {data?.success?.map((order, index) => (
            <div className="card mb-3" style={{ maxWidth: '100%' }} key={index}>
              <div className="row g-0">
                {/* Loop through items in the order */}
                {order.items.map((item, itemIndex) => (
                  <div className="col-md-4" key={itemIndex}>
                    <Link to={`/description/${item.product?._id || ''}`}>
                      <img
                        src={loading ? imageloader : `https://ecom-lwfl.onrender.com:3000/${item.product?.images[0]}`}
                        className="img-fluid rounded-start w-100"
                        style={{ height: '403px', objectFit: 'fill' }}
                        alt={item.product?.name || "Product Image"}
                        loading="lazy"
                      />
                    </Link>
                  </div>
                ))}

                <div className="col-md-8">
                  <div className="card-body">
                    {/* Display product details */}
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <p className="card-text">{loading ? <Skeleton /> : item?.product?.about}</p>
                        <p className="card-text">Quantity: {item.quantity || 1}</p>
                        <p className="card-text">
                          <i className="fa-solid fa-indian-rupee-sign"></i> {loading ? <Skeleton /> : item?.price || 0}
                        </p>
                      </div>
                    ))}
                    <p className="card-text">
                      <small className="text-body-secondary">
                        Delivered on {loading ? <Skeleton /> : formatDate(order?.createdAt)}
                      </small>
                    </p>
                  </div>

                  {/* Review Form - Only display if review has NOT been submitted */}
                  {order?.reviewSubmitted === false && (
                    <div className="card-footer">
                      {order.items.map((item, itemIndex) => (
                        <Formik
                          key={itemIndex}
                          initialValues={{
                            rating: '',
                            reviewText: '',
                          }}
                          validationSchema={yup.object({
                            rating: yup.number().required('Rating is required').min(1).max(5),
                            reviewText: yup.string().required('Review is required'),
                          })}
                          onSubmit={(values) => handleReviewSubmit(values, item?.product?._id)} // Send rating and review
                        >
                          {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
                            <form onSubmit={handleSubmit}>
                              {/* Rating Input */}
                              <div className="mb-3">
                                <div className="form-check form-check-inline">
                                  {[1, 2, 3, 4, 5].map((num) => (
                                    <div key={num} className="form-check form-check-inline">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="rating"
                                        id={`rating-${item.product?._id}-${num}`}
                                        value={num}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        checked={values.rating === num}
                                      />
                                      <label className="form-check-label text-warning" htmlFor={`rating-${item.product?._id}-${num}`}>
                                        {'★'.repeat(num)}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                                {touched.rating && errors.rating && (
                                  <div className="invalid-feedback d-block">{errors.rating}</div>
                                )}
                              </div>

                              {/* Review Text */}
                              <div className="mb-3">
                                <textarea
                                  name="reviewText"
                                  className={`form-control ${touched.reviewText && errors.reviewText ? 'is-invalid' : ''}`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.reviewText}
                                  placeholder="Your review here"
                                />
                                {touched.reviewText && errors.reviewText && (
                                  <div className="invalid-feedback">{errors.reviewText}</div>
                                )}
                              </div>

                              {/* Submit Button */}
                              <div className="mb-3">
                                <button type="submit" className="btn btn-info">Submit Review</button>
                              </div>
                            </form>
                          )}
                        </Formik>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
});

Orders.displayName = 'Orders';
export default Orders;
