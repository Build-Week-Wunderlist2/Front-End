import React from "react";
import { Route, Redirect } from "react-router-dom";

//PrivateRoute. Does not allow user to access the ToDo list unless they have the token set to localstorage

const PrivateRoute = ({ component: Component, ...initialProps }) => {
  return (
    <Route
      {...initialProps}
      render={(props) => {
        if (localStorage.getItem("token")) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
