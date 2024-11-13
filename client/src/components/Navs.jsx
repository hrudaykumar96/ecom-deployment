import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Navs = React.memo(() => {
  const location = useLocation();
  const data = useSelector((state)=>state.userdata.data);
  return (
    <div className="bg-body-secondary">
      <div className="container">
        <nav className="nav nav-pills flex-column flex-sm-row">
        {data?.success?.role !== 'user' && (
  (location.pathname === '/home' ||
    location.pathname === '/add/products' ||
    location.pathname === '/seller/management' ||
    location.pathname === '/products' ||
    location.pathname === '/update/products' ||
    location.pathname === '/user/management' ||
    location.pathname === '/send/notifications') && (
    <button
      type="button"
      className="flex-sm-fill fs-4"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasExample1"
      aria-controls="offcanvasExample"
    >
      <i className="fa-solid fa-bars"></i>
    </button>
  )
)}

          <Link
            className={`flex-sm-fill text-sm-center nav-link ${
              location.pathname === "/home" ? "active" : null
            }`}
            aria-current="page"
            to="/home"
          >
            all categories
          </Link>
          <Link
            className={`flex-sm-fill text-sm-center nav-link ${
              location.pathname === "/mens%20wear" ? "active" : null
            }`}
            to="/mens wear"
          >
            mens wear
          </Link>
          <Link
            className={`flex-sm-fill text-sm-center nav-link ${
              location.pathname === "/womens%20wear" ? "active" : null
            }`}
            to="/womens wear"
          >
            womens wear
          </Link>
          <Link
            className={`flex-sm-fill text-sm-center nav-link ${
              location.pathname === "/footwear" ? "active" : null
            }`}
            to="/footwear"
          >
            footwear
          </Link>
        </nav>
      </div>
    </div>
  );
});

Navs.displayName = "Navs";

export default Navs;