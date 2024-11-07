import { useCallback, useEffect, useMemo, useState } from 'react'

import './App.css'
import Navbar from './Navbar/navbar';
import axios from 'axios';

function App() {
  let [city, updateCity] = useState({city:'',sCode:'',CCode:''});
  let [weatherDetails,setDetails]= useState({})
  let  [geoPosition,setgeoPosition]= useState({latitude:"",longitude:''})
  let apiKey="2721011f3a3f654e00b464cfbd456a28"
  let search= useCallback((cityName)=>{
    updateCity(cityName)
    
  },[city]);
  
  function getCurrentLocation() {
    
    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
              setgeoPosition({latitude: position.coords.latitude,longitude: position.coords.longitude});
              
            },
            (err) => {
                switch(err.code) {
                    case err.PERMISSION_DENIED:
                        document.getElementById('location').innerText = "User  denied the request for Geolocation.";
                        break;
                    case err.POSITION_UNAVAILABLE:
                        document.getElementById('location').innerText = "Location information is unavailable.";
                        break;
                    case err.TIMEOUT:
                        document.getElementById('location').innerText = "The request to get user location timed out.";
                        break;
                    case err.UNKNOWN_ERROR:
                        document.getElementById('location').innerText = "An unknown error occurred.";
                        break;
                }
            }
        );
    } else {
        document.getElementById('location').innerText = "Geolocation is not supported by this browser.";
    }
}

  console.log(geoPosition);
  

  let currentWeather= async()=>{

    
      let {data}= await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${geoPosition.latitude}&lon=${geoPosition.longitude}&appid=${apiKey}`)
      console.log(data);
      
  
    }
    
  useEffect(()=>{
    getCurrentLocation()
    
  },[])

  useEffect(()=>{
    if(geoPosition.latitude){
  
     currentWeather()
      }
  },[geoPosition])

  

  
return <div className='app-background' >
      
    <p id="location"></p>
    <Navbar searchCity={search} />

</div>

}

export default App 