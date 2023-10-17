import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const [credentials, setCredentials] = useState({name:"",email:"",password:"",confirmpassword:""})
  let Navigate=useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password}=credentials;
    const response = await fetch(`https://inotebookbackend-1wyn.onrender.com/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({name,email,password})
    });
    const json = await response.json();
    console.log(json);
      //save the auth token and redirect 
      localStorage.setItem('token',json.authtoken)
      Navigate("/")
  }
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="mb-3 my-5">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" id="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3 my-5">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" id="email" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} id="password" name="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label"> Confirm Password</label>
          <input type="password" className="form-control" onChange={onChange} id="confirmpassword" name="confirmpassword" minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup