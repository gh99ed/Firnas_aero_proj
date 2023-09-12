import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Login from './pages/login';
import FirnasLog from './pages/firnas_log';
import MedLog from './pages/med_log';
import { app } from './firebaseConfig/config';
import 'firebase/auth'
import PrivateRoute from './comp/PrivateRoute/PrivateRoute';
import {onAuthStateChanged,getAuth} from 'firebase/auth';

function App() {

  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    console.log("CAelld")
    const unsubscribe = onAuthStateChanged(auth,(authUser) => {
      if (authUser) {
        console.log('User is authenticated:', authUser);
    
        setUser(authUser);
      } else {
        console.log('User is not authenticated.');
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);


  return (
    // <Router>
    //   <div className="App">
    //     <Route path="/" component={Login} />
    //     <Route path="/firnas_log" component={FirnasLog} />
    //     <Route path="/med_log" component={MedLog} />
    //     {/* Other routes and components */}
    //   </div>
    // </Router>

      <Router>
     <Routes>
      <Route path="/" element={<Login />} />
      {/* <PrivateRoute
        path="/firnas_log"
        component={FirnasLog}
        userRole={user ? user.displayName ==='jumanhAdmin' ? 'admin' : '' : ''}
      />
      <PrivateRoute
        path="/med_log"
        component={MedLog}
        userRole={user ? user.displayName ==='madinahuser' ? 'user' : '' : ''}
      />*/}
       <Route path="/firnas_log" element={<FirnasLog/>} />
    //     <Route path="/med_log" element={<MedLog/>} />
    

        {/* <Route
          path="/firnas_log"
          element={<PrivateRoute component={<FirnasLog/>}  userRole={user ? user.displayName ==='jumanhAdmin' ? 'admin' : '' : ''} />}
        />
        <Route
          path="/med_log"
          element={<PrivateRoute component={<MedLog/>} userRole={user ? user.displayName ==='madinahuser' ? 'user' : '' : ''} />}
        />
         <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes> 
      </Router>
  );
}

export default App;