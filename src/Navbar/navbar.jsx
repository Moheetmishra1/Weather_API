import React, {  memo, useEffect, useState } from "react"
import "./navbar.css"

 function Navbar({searchCity}){
    let [city,setCity]=useState('')
    function updateCity(event){
        
        searchCity(event.target.value)
        setCity(event.target.value);
    }
      function   passCity(event){
        event.preventDefault();
        searchCity(city)
      }
  
      

    return (
        <>
        <header className="p-3   ">
    <div className="container ">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
       

        <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXmeDisiOqN2saFNDbhJK99Pid4E8BqNPmnw&s" className=" logo-img nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
         
        </img>

        <form className="col-8 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onSubmit={passCity} >
          <input type="search" className="form-control form-control-dark "  onChange={updateCity} placeholder="Enter city." aria-label="Search" />
          <button type="submit" className="btn btn-outline-dark me-2  "  >Search</button>
        </form>

     
      </div>
    </div>
  </header>
        </>
    )
}


export default memo(Navbar)