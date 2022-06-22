import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const host ="http://localhost:5000";
    let navigate=useNavigate();

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const [credentials,setCredentials]=useState({email:"",password:""});
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch(`${host}/api/auth/login`,{
            method:"POST",
            headers:{
              'content-type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json=await response.json();
          if(json.Success)
          {
              localStorage.setItem('token',json.authToken);
              navigate("/");
          }
          else
          {
            //   alert("INVALID CREDENTIALS");
              props.showAlert("Invalid Credentials","Danger");
          }

    }
  return (
    <div className="container">
      <h4 className="mt-3">Login To Continue</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
    
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
