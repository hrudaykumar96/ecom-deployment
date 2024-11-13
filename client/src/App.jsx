import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import { lazy, Suspense, useState } from "react";
import Loader from "./effects/Loader.jsx";
import Protected_Route from "./utilities/Protected_Route.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { useSelector } from "react-redux";
import 'react-loading-skeleton/dist/skeleton.css'
import propTypes from "prop-types";
import ScrollToTop from "./effects/ScrollToTop.jsx";

const Login = lazy(() => import("./forms/Login.jsx"));
const Signup = lazy(() => import("./forms/Signup.jsx"));
const Reset_Password = lazy(() => import("./forms/Reset_Password.jsx"));
const Home = lazy(() => import("./Pages/Home.jsx"));
const Menswear = lazy(() => import("./Pages/Menswear.jsx"));
const Womenswear = lazy(() => import("./Pages/Womenswear.jsx"));
const Footwear = lazy(() => import("./Pages/Footwear.jsx"));
const Notifications = lazy(() => import("./Pages/Notifications.jsx"));
const Output = lazy(() => import("./Pages/Output.jsx"));
const Profile = lazy(() => import("./Pages/Profile.jsx"));
const Change_Password = lazy(() => import("./forms/Change_Password.jsx"));
const Cart = lazy(() => import("./Pages/Cart.jsx"));
const Product_Description = lazy(() => import("./Pages/Product.jsx"));
const Add_Products = lazy(() => import("./Pages/Add_Products.jsx"));
const Seller_Management = lazy(() => import("./Pages/Seller_Management.jsx"));
const Products = lazy(() => import("./Pages/Products.jsx"));
const Update_Products = lazy(() => import("./Pages/Update_Products.jsx"));
const User_Management = lazy(() => import("./Pages/User_Management.jsx"));
const Send_Notifications = lazy(() => import("./Pages/Send_Notifications.jsx"));

const App = () => {

  const data = useSelector((state) => state.userdata.data);
  const [search, setSearch] = useState('');

  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Suspense fallback={<Loader />}>
        <Change_Password data={data} />
        { data?.success?.role === 'user' ? null: 
        <Sidebar data={data}/>
      }

        {/* Navbar and Footer should be conditionally rendered based on location */}
        <LocationBasedNavbar setSearch={setSearch} />

        {/* Define routes */}
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<Reset_Password />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <Protected_Route>
                <Home />
              </Protected_Route>
            }
          />
          <Route
            path="/mens wear"
            element={
              <Protected_Route>
                <Menswear search={search} />
              </Protected_Route>
            }
          />
          <Route
            path="/womens wear"
            element={
              <Protected_Route>
                <Womenswear search={search} />
              </Protected_Route>
            }
          />
          <Route
            path="/footwear"
            element={
              <Protected_Route>
                <Footwear search={search} />
              </Protected_Route>
            }
          />
          <Route
            path="/notifications"
            element={
              <Protected_Route>
                <Notifications />
              </Protected_Route>
            }
          />
          <Route
            path="/notification/:id"
            element={
              <Protected_Route>
                <Output />
              </Protected_Route>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected_Route>
                <Profile />
              </Protected_Route>
            }
          />
          <Route
            path="/cart"
            element={
              <Protected_Route>
                <Cart />
              </Protected_Route>
            }
          />
          <Route
            path="/description/:id"
            element={
              <Protected_Route>
                <Product_Description />
              </Protected_Route>
            }
          />
          { data?.success?.role === 'user' ? null :(
          <Route
          path="/add/products"
          element={
            <Protected_Route>
              <Add_Products />
            </Protected_Route>
          }
        />
          ) }
          { data?.success?.role === 'user' ? null :(          
          <Route
            path="/seller/management"
            element={
              <Protected_Route>
                <Seller_Management />
              </Protected_Route>
            }
          />
          )}
          { data?.success?.role === 'user' ? null :(
          <Route
            path="/products"
            element={
              <Protected_Route>
                <Products />
              </Protected_Route>
            }
          />
          )}
          { data?.success?.role === 'user' ? null :(
          <Route
            path="/update/products/:id"
            element={
              <Protected_Route>
                <Update_Products />
              </Protected_Route>
            }
          />
          )}
          { data?.success?.role === 'admin' ? (
                      <Route
                      path="/user/management"
                      element={
                        <Protected_Route>
                          <User_Management />
                        </Protected_Route>
                      }
                    />
          ) : null }
          { data?.success?.role === 'admin' &&
          <Route
            path="/send/notifications"
            element={
              <Protected_Route>
                <Send_Notifications />
              </Protected_Route>
            }
          />
}
        </Routes>
        <LocationBasedFooter/>
      </Suspense>
    </BrowserRouter>
  );
};

const LocationBasedNavbar = ({setSearch}) => {
  const location = useLocation(); 
  const { data } = useSelector((state) => state.userdata);

  return (
    <>
      {!(location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/forgotpassword") && <Navbar data={data} setSearch={setSearch} />}
    </>
  );
};
LocationBasedNavbar.propTypes = {
  setSearch: propTypes.any, 
};

const LocationBasedFooter = () => {
  const location = useLocation(); 

  return (
    <>
      {!(location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/forgotpassword") && <Footer />}
    </>
  );
};

export default App;