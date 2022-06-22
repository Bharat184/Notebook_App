import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';

function Signup() {
    const host ="http://localhost:5000";
    let navigator=useNavigate();
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch(`${host}/api/auth/createuser`,{
            method:"POST",
            headers:{
              'content-type':'application/json',
              'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjMDMzN2M3NGY3MzM1ODNmZjJiMGMxIn0sImlhdCI6MTYzOTk4NjA0NX0.rFAcFA_E1K73wC2D9j6qWfeoYZJU2059T-smwt9SUPs'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.email})
          });
          const json=await response.json();
          if(json.success)
          {
              localStorage.setItem('token',json.authToken);
              alert("USer Added")
              navigator("/");
          }
          else
          {
              alert("Not Added");
          }

    }

    

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="my-2">Sign-Up to create an Account.</h4>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Enter Your Name
        </label>
        <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          name="email"
          aria-describedby="emailHelp"
          onChange={onChange}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          name="password"
          onChange={onChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword2"
          name="cpassword"
          onChange={onChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Signup;
