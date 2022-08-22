import { Navigate } from "react-router-dom";

const UnauthProtected = ({ isLoggedIn, children }) => {
  isLoggedIn = window.sessionStorage.getItem("token") ? true : false;
  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default UnauthProtected;
