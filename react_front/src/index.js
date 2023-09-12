import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login';
import FirnasLog from './pages/firnas_log';
import MedLog from './pages/med_log';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,  
  },

  {
    path: "/firnas_log",
    element: <FirnasLog />,  
  },

  {
    path: "/med_log",
    element: <MedLog />,  
  },
 
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       {/* <RouterProvider router={router} /> */}
       <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
