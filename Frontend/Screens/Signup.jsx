// import React, {useState} from 'react'
// import {Link} from 'react-router-dom'


// function Signup() {
//     const [credentials, setcredentials] = useState({name:"", email:"", password:"", geolocation:""})

//     const handleSubmit = async(e) =>{
//         e.preventDefault();
//         const response = await fetch("http://localhost:5001/api/createuser",{
//             method:'POST',
//             header:{
//                 'Content-Type':'application/json'
//             },
//             body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
//         })
//         const json = await response.json()
//         console.log(json)

//         if(!json.success){
//             alert("Enter valid credentials")
//         }
//     }

//     const onchange = (event) =>{
//         setcredentials({...credentials, [event.target.name]:event.target.value})
//     }

//     return (
//         <>
//         <div className='container'>
//             <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//                     <label htmlFor="name" className="htmlForm-label">Name: </label>
//                     <input type="text" className="form-control" name='name' value={credentials.name} onChange={onchange} style={{ width: "300px", height: "40px" }}/>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email address: </label>
//                     <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchange} style={{ width: "300px", height: "40px" }}/>
//                         <div id="emailHelp" className="htmlForm-text">We'll never share your email with anyone else.</div>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="exampleInputPassword1" className="htmlForm-label">Password: </label>
//                     <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onchange} style={{ width: "300px", height: "40px" }}/>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="exampleInputPassword1" className="htmlForm-label">Location: </label>
//                     <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onchange} style={{ width: "300px", height: "40px" }} />
//                 </div>
                
//                 <button type="submit" className="m-3 btn btn-success">Submit</button>
//                 <Link to='/login' className="m-3 btn btn-danger">Already a User</Link>
//             </form>
//             </div>
//         </>
//     )
// }

// export default Signup 

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        location: "" // Changed from geolocation to location
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:5001/api/createuser", {
                method: 'POST',
                headers: { // ✅ Fixed 'header' → 'headers'
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.location // ✅ Fixed geolocation → location
                })
            });

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                alert("Enter valid credentials");
            } else {
                alert("Signup successful!");
                window.location.href = "/login"; // Redirect to login page
            }
        } catch (error) {
            console.error("Signup error:", error);
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
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name='name'
                        value={credentials.name}
                        onChange={handleChange}
                        style={{ width: "300px", height: "40px" }}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address:</label>
                    <input
                        type="email"
                        className="form-control"
                        name='email'
                        value={credentials.email}
                        onChange={handleChange}
                        style={{ width: "300px", height: "40px" }}
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
                        onChange={handleChange}
                        style={{ width: "300px", height: "40px" }}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location:</label>
                    <input
                        type="text"
                        className="form-control"
                        name='location' // ✅ Fixed geolocation → location
                        value={credentials.location}
                        onChange={handleChange}
                        style={{ width: "300px", height: "40px" }}
                        required
                    />
                </div>
                
                <button type="submit" className="m-3 btn btn-success">Sign Up</button>
                <Link to='/login' className="m-3 btn btn-danger">Already a User?</Link>
            </form>
        </div>
    );
}

export default Signup;
