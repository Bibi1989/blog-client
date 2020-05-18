import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = sessionStorage.getItem("blog");
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
