import React, { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = sessionStorage.getItem("blog");
  const loc = useLocation();
  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? <Redirect to='/home' /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
