import { useCallback, useEffect, useMemo, useState } from 'react'

import './App.css'
import Navbar from './Navbar/navbar';
import axios from 'axios';

function App() {
  let [city, updateCity] = useState({city:'',sCode:'',CCode:''});
  let [weatherDetails,setDetails]= useState({})
  let apiKey="2721011f3a3f654e00b464cfbd456a28"
  let search= useCallback((cityName)=>{
    updateCity(cityName)
    console.log(cityName);
    
  },[city]);
  
  function getCurrentLocation() {
    // Check if Geolocation is supported
    if (window.navigator.geolocation) {
        // Request the user's current position
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                document.getElementById('location').innerText = `Latitude: ${latitude}, Longitude: ${longitude}`;
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



  let currentWeather= async()=>{
      let {data}= await axios.get(``)
  }
  useEffect(()=>{
    // console.log("loc",window.navigator.geolocation.getCurrentPosition(success,error));
   
    
  })

  useEffect(()=>{

  },[city])

  
return <div className='app-background' onLoad={getCurrentLocation}>
      

    <Navbar searchCity={search} />

</div>

}

export default App 