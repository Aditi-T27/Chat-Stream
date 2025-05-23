import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      email: formData.email,
      fullname: formData.fullname,
      password: formData.password,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:3001/signup', requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (data.status === 'successful') {
          alert(data.message);
        } else {
          alert('Signup failed: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      });
  }

  return (
    <div className="flex min-h-screen">
      {/* Left - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-10 py-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up for PulseChat</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
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
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Description & SVG */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white items-center justify-center p-10">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-4">Join PulseChat 🎉</h1>
          <p className="text-lg mb-6">
            PulseChat brings people together in real-time. Sign up to start conversations, share ideas, and stay connected like never before.
          </p>
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

export default Signup;







//****************************************
// // import React from 'react'
// // import { useState } from 'react';
// // import { supabase } from '../client';
// // import {Link} from 'react-router-dom'
// // const Signup = () => {
  
// //   const [formData,setFormData]=useState({
// //     fullname:'',email:'',password:''
// //   })
 
// //   console.log(formData);

// //   function handleChange(event){
// //     setFormData((prevFormdata)=>{

// //         return {
// //             ...prevFormdata,
// //         [event.target.name]:event.target.value
// //         }
// //     })
      
// //   }  
// //   async function handleSubmit(e) {
// //     e.preventDefault();
    
// //     const { data, error } = await supabase.auth.signUp({
// //         email: formData.email,
// //         password: formData.password,
// //         options: {
// //             data: {
// //                 fullname: formData.fullname,
// //             }
// //         }
// //     });

// //     if (error) {
// //         console.error("Error signing up:", error.message);
// //         alert(error.message);
// //         return;
// //     }

// //     // Insert the user into 'users' table
// //     const { error: insertError } = await supabase.from('users').insert([
// //         {
// //             id: data.user.id,  // Supabase assigns a UUID
// //             email: formData.email,
// //             name: formData.fullname,
// //             created_at: new Date()
// //         }
// //     ]);

// //     if (insertError) {
// //         console.error("Error inserting user:", insertError.message);
// //     } else {
// //         alert("Check your email for verification link");
// //     }
// // }


// //   return (
// //     <div>
// //       <form onSubmit={handleSubmit}>
// //        <input type="text"
// //          placeholder='Name' name='fullname' onChange={handleChange}
// //        />
// //        <br />
// //        <input type="text"
// //         placeholder='email..' name='email' onChange={handleChange} />
// //         <br />
// //        <input type="text"
// //         placeholder='Password' name='password' onChange={handleChange} />
// //         <br />
// //         <button type='submit'> Submit  </button>
// //       </form>
// //    Alreday have an account? <Link to='/login'> Login </Link>
// //     </div>
// //   )
// // }

// // export default Signup


// import React from 'react'
// import { useState } from 'react';
// import {Link} from 'react-router-dom'
// const Signup = () => {
  
//   const [formData,setFormData]=useState({
//     fullname:'',email:'',password:''
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
    
//     const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const raw = JSON.stringify({
//   "email":formData.email ,
//   "fullname": formData.fullname,
//   "password": formData.password
// });

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch("http://localhost:3001/signup", requestOptions)
//   .then((response) => {
//     // Check if the response is ok (status in range 200-299)
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json(); // Return the parsed JSON
//   })
//   .then((data) => {
//     if (data.status === "successful") {
//       alert(data.message);
//     } else {
//       alert("Signup failed: " + data.message);
//     }
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//     alert("Something went wrong. Please try again.");
//   });
//   }


//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//        <input type="text"
//          placeholder='Name' name='fullname' onChange={handleChange}
//        />
//        <br />
//        <input type="text"
//         placeholder='email..' name='email' onChange={handleChange} />
//         <br />
//        <input type="text"
//         placeholder='Password' name='password' onChange={handleChange} />
//         <br />
//         <button type='submit'> Submit  </button>
//       </form>
//    Alreday have an account? <Link to='/login'> Login </Link>
//     </div>
//   )
// }

// export default Signup
