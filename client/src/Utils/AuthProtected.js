import { Navigate } from "react-router-dom";

const AuthProtected = ({ isLoggedIn, children }) => {
  isLoggedIn = window.sessionStorage.getItem("token") ? true : false;

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthProtected;
