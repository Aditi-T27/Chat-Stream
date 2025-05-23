
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { useState ,useEffect} from 'react'
// import { Signup,Login,Homepage } from './pages'
// import {Routes,Route} from 'react-router-dom'
// function App() {
//   const[token,setToken] = useState(false);
  
//   if(token){
//     sessionStorage.setItem('token',JSON.stringify(token))
//   }
//   useEffect(()=>{
//     if(sessionStorage.getItem('token')){
//       let data = JSON.parse(sessionStorage.getItem('token'))
//       setToken(data)
//     }
//   },[])

//   return (
//     <>
//       {/* <Signup/> */}
    

//       <Routes>
//         {/* dEFAULT PATH */}
//         <Route path={'/'} element={<Signup/>}/>
//         <Route path={'/login'} element={<Login setToken={setToken}/>}/>
//         {token?<Route path={'/homepage'} element={<Homepage/>}/>:""}
//       </Routes>
//     </>
//   )
// }

// export default App

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/mainPage/Homepage.jsx';
import  Signup from './pages/mainPage/Components/Signup.jsx';
import Login from './pages/mainPage/Components/Login.jsx';


function App() {
  const [token, setToken] = useState(() => {
    return JSON.parse(sessionStorage.getItem('token')) || false;
  });

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Signup />} />
        <Route path={'/login'} element={<Login setToken={setToken} />} />
        <Route
          path={'/homepage'}
          element={token ? <Homepage token={token}/> : <Navigate to="/login" />}
        />
        {/* <Route path={'/homepage/connect'} element={<Connect token={token} />} /> */}
      </Routes>
    </>
  );
}

export default App;
