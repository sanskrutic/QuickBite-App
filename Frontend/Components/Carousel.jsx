import React from 'react'

function Carousel() {
  return (
    <div>
      <form className="d-flex mt-5">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{"width":"30rem", "height":"40px", "marginLeft":"20rem"}}/>
      <button className="btn btn-outline-success" type="submit" style={{"width":"100px", "height":"40px"}}>Search</button>
    </form>
    </div>
  )
}

export default Carousel
