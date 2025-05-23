import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom'
const Signup = () => {
  
  const [formData,setFormData]=useState({
    fullname:'',email:'',password:''
  })
 
  console.log(formData);

  function handleChange(event){
    setFormData((prevFormdata)=>{

        return {
            ...prevFormdata,
        [event.target.name]:event.target.value
        }
    })
      
  }  
  async function handleSubmit(e) {
    e.preventDefault();
    
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "email":formData.email ,
  "fullname": formData.fullname,
  "password": formData.password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3001/signup", requestOptions)
  .then((response) => {
    // Check if the response is ok (status in range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Return the parsed JSON
  })
  .then((data) => {
    if (data.status === "successful") {
      alert(data.message);
    } else {
      alert("Signup failed: " + data.message);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  });
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
       <input type="text"
         placeholder='Name' name='fullname' onChange={handleChange}
       />
       <br />
       <input type="text"
        placeholder='email..' name='email' onChange={handleChange} />
        <br />
       <input type="text"
        placeholder='Password' name='password' onChange={handleChange} />
        <br />
        <button type='submit'> Submit  </button>
      </form>
   Alreday have an account? <Link to='/login'> Login </Link>
    </div>
  )
}

export default Signup
