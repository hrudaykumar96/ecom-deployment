import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import React, { useEffect } from "react";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  clearallusersdata,
  cleargetcartdata,
  cleargetnotificationbyidresponse,
  cleargetnotificationresponse,
  cleargetorders,
  cleargetproductresponse,
  clearproductsinfoslice,
  clearupdateusersdatabyid,
  logoutreducer,
} from "../redux/slices";
import swal from "sweetalert";
import { getcartdata, getnotificationsdata, getuserdata } from "../redux/api";

const Navbar = React.memo(({ data, setSearch }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const response = useSelector((state) => state.updateuserdata.response);
  const cart_data = useSelector((state)=>state.getcartdataslice.data);
  const notification_data= useSelector((state)=>state.getnotificationslice.data);

  useEffect(() => {
    if (token) {
      dispatch(getuserdata(token));
      dispatch(getcartdata(token));
      dispatch(getnotificationsdata(token))
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (response) {
      if (response.success) {
        dispatch(getuserdata(token));
      }
    }
  }, [response, token, dispatch]);

  /* logout functionality */
  const logout = () => {
    dispatch(logoutreducer());
    dispatch(clearallusersdata());
    dispatch(clearupdateusersdatabyid());
    dispatch(cleargetproductresponse());
    localStorage.removeItem("token");
    dispatch(cleargetcartdata());
    dispatch(clearproductsinfoslice());
    dispatch(cleargetorders());
    dispatch(cleargetnotificationresponse());
    dispatch(cleargetnotificationbyidresponse());
    navigate("/");
    swal("Success", "You are logged out successfully", "success");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          <img
            src={logo}
            alt="logo"
            loading="lazy"
            className="img-fluid"
            style={{ height: "50px", mixBlendMode: "darken" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {
          location.pathname === "/mens%20wear" ||
          location.pathname === "/womens%20wear" ||
          location.pathname === "/footwear" ? (
            <>
              <form
                className="ms-auto position-relative"
                role="search"
                style={{ minWidth: "50%" }}
              >
                <span className="position-absolute top-50 start-0 translate-middle ms-3">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  className="form-control me-2 ps-5"
                  type="search"
                  placeholder="Search for products, brands and more"
                  aria-label="Search"
                  onChange={(e)=>setSearch(e.target.value)}
                />
              </form>
            </>
          ) : null}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/home" ? "active" : null
                }`}
                aria-current="page"
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
  <Link
    to="/notifications"
    className={`nav-link ${
      location.pathname === "/notifications" ? "active" : ""
    }`}
  >
    Notifications
    {Array.isArray(notification_data?.success) && (
      // Filter unread notifications (notifications where the user hasn't read)
      notification_data.success.filter((msg) => {
        // Check if the current user's ID is NOT in the readBy array
        return !msg.readBy.includes(data?.success?._id);
      }).length > 0 ? (
        // Only show badge if there are unread notifications
        <span className="badge text-bg-secondary">
          {
            notification_data.success.filter((msg) => 
              !msg.readBy.includes(data?.success?._id)  // Unread notifications
            ).length
          }
        </span>
      ) : null // Don't show badge if no unread notifications
    )}
  </Link>
</li>


            <li className="nav-item">
              <Link
                to="/cart"
                className={`nav-link ${
                  location.pathname === "/cart" ? "active" : null
                }`}
              >
Cart {cart_data?.success?.length > 0 ? (
  <span className="badge text-bg-secondary">
    {cart_data?.success[0]?.products?.reduce((total, product) => {
      return total + (product?.quantity || 0); // Add the quantity of each product
    }, 0)}
  </span>
) : null}

              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {data?.success?.name}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    change password
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={logout}>
                    logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});
Navbar.displayName = "Navbar";
Navbar.propTypes = {
  data: propTypes.any,
  setSearch: propTypes.any,
};
export default Navbar;