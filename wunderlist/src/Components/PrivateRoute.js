import React from "react";
import { Route, Redirect } from "react-router-dom";

<<<<<<< HEAD
=======
//PrivateRoute. Does not allow user to access the ToDo list unless they have the token set to localstorage

>>>>>>> 7fbc931087c7fa2e6abea2bc97ab7e0fec8b3661
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
