import React, { useState } from 'react';
import { supabase } from '../../../client';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    setFormData((prevFormdata) => ({
      ...prevFormdata,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      console.log('Sign-in response:', data);
      setToken(data);

      if (error) {
        alert(error.message);
      } else if (data.session) {
        navigate('/homepage');
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-10 py-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to PulseChat</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300"
            >
              Submit
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don’t have an account?{' '}
            <Link to="/" className="text-indigo-600 hover:underline font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Description & SVG */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white items-center justify-center p-10">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to PulseChat 💬</h1>
          <p className="text-lg mb-6">
            Connect. Communicate. Collaborate. <br />
            PulseChat is your modern messaging hub with real-time updates, stunning UI, and ultra-fast performance.
          </p>
          {/* SVG Illustration */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-52 w-52"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={1.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.64-3.59A8.966 8.966 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Login;







//**************************************************************
// import React from 'react'
// import { useState } from 'react';
// import { supabase } from '../../../client';
// import {Link, useNavigate} from 'react-router-dom';

// const  Login= ({setToken}) => {

//   let navigate=useNavigate()
  
//   const [formData,setFormData]=useState({
//      email:'',password:''
//   })
 
//   console.log(formData);

//   function handleChange(event){
//     setFormData((prevFormdata)=>{

//         return {
//             ...prevFormdata,
//         [event.target.name]:event.target.value
//         }
//     })
      
//   }  
//   async function handleSubmit(e) {
//     e.preventDefault();
//     try{
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: formData.email,
//       password: formData.password,
//     });

//     console.log("Sign-in response:", data);
//     setToken(data);


//     if (error) {
//       console.error("Error signing in:", error.message);
//       alert(error.message);
//     } else if (data.session) {
//       console.log("Session ID:", data.session.access_token);
//       navigate('/homepage')
//     } else {
//       console.log("No session returned.");
//     }
  
//   }
//     catch(error){
//       alert(error);
//     }
// }

  

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
   
      
//        <input type="text"
//         placeholder='email..' name='email' onChange={handleChange} />
//         <br />
//        <input type="text"
//         placeholder='Password' name='password' onChange={handleChange} />
//         <br />
//         <button type='submit'> Submit  </button>
//       </form>
//      Dont't have an Account? <Link to='/'>SignUp</Link>
//     </div>
//   )
// }

// export default Login
    