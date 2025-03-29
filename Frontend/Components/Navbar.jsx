
// import React from 'react'
// import {Link,useNavigate} from 'react-router-dom';

// function Navbar() {
//   const navigate = useNavigate();
//   const handleLogout = () =>{
//     localStorage.removeItem("authToken");
//     navigate("/login")
//   }

//   return (
//     <div>
//         <nav className="navbar navbar-expand-lg navbar-dark bg-success">
//         <div className="container-fluid">
//         <Link className="navbar-brand fs-1 fst-italic fst-bold" to="/">QuickBite</Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//         <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav me-auto mb-2">
//             <li className="nav-item">
//             <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
//             </li>
//             {(localStorage.getItem("authToken"))?
//               <li className="nav-item">
//               <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
//               </li>
//               :""}
            
//         </ul>
//         {(localStorage.getItem("authToken"))?
//          <div className='d-flex '> 
//             <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
//             <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
//           </div>
//           :
//           <div>
//           <div className='btn bg-white text-success mx-2'>My Cart</div>
//           <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout</div>
//           </div>
//           }
//         </div>
//     </div>
//     </nav>
//     </div>
//   )
// }

// export default Navbar 

import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

function Navbar() {

  let data = useCart();
  const [cartview, setcartview] = useState(false);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic fw-bold" to="/">QuickBite</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/">Home</Link>
              </li>
              {authToken && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" to="/myOrder">My Orders</Link>
                </li>
              )}
            </ul>

            {!authToken ? (
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">Sign Up</Link>
              </div>
            ) : (
              <div>
                <Link className='btn bg-white text-success mx-2' to="/cart" onClick={()=>{setcartview(true)}}>
                  My Cart {" "}
                  <Badge pill bg="danger">{data.length}</Badge>
                </Link>
                {cartview ? <Modal onClose={()=>setcartview(false)}><Cart/></Modal> : null}
                <button className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
