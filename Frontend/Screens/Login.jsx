// import React, { useState } from 'react'
// import {Link, useNavigate} from 'react-router-dom'

// function Login() {
//   const [credentials, setcredentials] = useState({ email: "", password: "" })
//   let navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5001/api/createuser", {
//       method: 'POST',
//       header: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email: credentials.email, password: credentials.password })
//     })
//     const json = await response.json()
//     console.log(json)

//     if (!json.success) {
//       alert("Enter valid credentials")
//     }

//     if (json.success) {
//       localStorage.setItem("authToken",json.authToken);
//       navigate("/");
//     }
//   }

//   const onchange = (event) => {
//     setcredentials({ ...credentials, [event.target.name]: event.target.value })
//   }


//   return (
//     <>
//       <div className='container'>
//         <form onSubmit={handleSubmit}>
          
//           <div className="mb-3">
//             <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email address: </label>
//             <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchange} />
//             <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputPassword1" className="htmlForm-label">Password: </label>
//             <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onchange} />
//           </div>
          

//           <button type="submit" className="m-3 btn btn-success">Submit</button>
//           <Link to='/createuser' className="m-3 btn btn-danger">I am a new user</Link>
//         </form>
//       </div>
//     </>
//   )
// }

// export default Login 


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/loginuser", { // ✅ Fixed endpoint
        method: 'POST',
        headers: { // ✅ Fixed 'header' → 'headers'
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Invalid email or password. Please try again.");
      } else {
        console.log("Saving to localStorage:", credentials.email);
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            console.log("Stored userEmail:", localStorage.getItem("userEmail"));  // ✅ Check if it's actually stored
            alert("Login successful!");
            navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address:</label>
          <input
            type="email"
            className="form-control"
            name='email'
            value={credentials.email}
            id="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            name='password'
            value={credentials.password}
            id="password"
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="m-3 btn btn-success">Login</button>
        <Link to='/createuser' className="m-3 btn btn-danger">I am a new user</Link>
      </form>
    </div>
  );
}

export default Login;
