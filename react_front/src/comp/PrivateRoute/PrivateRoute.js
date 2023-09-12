import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route,Navigate } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';


function PrivateRoute({ component: Component, userRole,...rest}) {
  return (
    <Route
         {...rest}
      render={(props) => {
        if (userRole === 'admin') {
          return <Component  />;
        } else if (userRole === 'user') {
          return <Component  />;
        } else {
          return <Navigate replace to="/" />;
        }
      }}
    />
  );
}

export default PrivateRoute