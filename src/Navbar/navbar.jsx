import  {  memo, useEffect, useState } from "react"
import "./navbar.css"
import axios from "axios";

 function Navbar({searchCity}){
    let [city,setCity]=useState({city:'',countryCode:"",stateCode:""});
    let [cities,setCities]= useState([])
    
  let apiKey="2721011f3a3f654e00b464cfbd456a28"

  document.body.addEventListener('click',()=>setCities([]))
    function updateCity({target:{name,value}}){
      value=value.trim()
      setCity({...city,[name]:value});
      getLongitude({...city,[name]:value})
    }
    
      function   passCity(event){
        
        event.preventDefault();
        getLongitude(city)
      }

    async  function getLongitude(city){
      console.log("Searching",city);
      
        let {data} =await  axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city.city},${city.stateCode},${city.countryCode}&limit=20&appid=${apiKey}`);
       
        if(data.length){
          setCities(data)  
        } 
      }

      // useEffect(()=>{
      //   if(city.city && city.countryCode && city.stateCode){
      //     getLongitude()
      //   }
      // },[city])
  
      

    return (
        <>
        <header className="p-3   ">
    <div className="container ">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
       

        <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXmeDisiOqN2saFNDbhJK99Pid4E8BqNPmnw&s" className=" logo-img nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
         
        </img>

        <form className="col-8 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onSubmit={passCity} >
          <input type="search" className="form-control form-control-dark "  name="city" onChange={updateCity} placeholder="Enter city" aria-label="Search" />
          <input type="search" className="form-control form-control-dark "  name='country' onChange={updateCity} placeholder="country code." aria-label="Search" />
          <input type="search" className="form-control form-control-dark " name="state"  onChange={updateCity} placeholder="state code" aria-label="Search" />
          <button type="submit" className="btn btn-outline-dark me-2  "  >Search</button>
         </form>
      { cities[0] && <>
         <nav className="cityListSearch">
         <ul className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px" data-bs-theme="light">
         { cities.map((a)=> {
            return  <li key={a.lat} onClick={()=>searchCity({latitude:a.lat,longitude:a.lon})} >
                          <div>{a.name}</div>
                          <div>{a.state}</div>
                          <div>{a.country}</div>
                     </li>
          })}

     {/* <li><a className="dropdown-item rounded-2 active" href="#">Action</a></li>
     <li><a className="dropdown-item rounded-2" href="#">Another action</a></li>
     <li><a className="dropdown-item rounded-2" href="#">Something else here</a></li>
     <li><hr className="dropdown-divider" /></li>
     <li><a className="dropdown-item rounded-2" href="#">Separated link</a></li> */}
   </ul>
 </nav>
 </> }

     
      </div>
    </div>
  </header>
        </>
    )
}


export default memo(Navbar)