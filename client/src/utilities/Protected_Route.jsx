import { Navigate } from "react-router-dom";
import propTypes from "prop-types";

const Protected_Route = ({ children }) => {
  const authentication = localStorage.getItem('token');
  return authentication ? children : <Navigate to="/" />;
};
Protected_Route.propTypes = {
  children: propTypes.node,
};
export default Protected_Route;