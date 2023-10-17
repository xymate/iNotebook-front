import React from 'react'
import { useState} from 'react';
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [credentials, setCredentials] = useState({email:"",password:""})
  let navigate=useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://inotebookbackend-1wyn.onrender.com/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //save the auth token and redirect 
      localStorage.setItem('token',json.authtoken)
      navigate("/")
    }
    else{
      alert("invalid credentials")
    }
  }
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-5">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" id="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login