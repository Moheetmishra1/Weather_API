import { useCallback, useEffect, useState } from 'react'

import './App.css'
import Navbar from './Navbar/navbar';
import axios from 'axios';
import { CityCloud } from './cityCloud/cityCloud';

function App() {
  // let [cities, setCities] = useState([]);
  let [geoPosition,setgeoPosition]=useState({longitude:'',latitude:''})
  let [weatherDetails, setWeatherDetails]= useState({})
 
  let apiKey="2721011f3a3f654e00b464cfbd456a28" ;
  function searchCities(data){
    setgeoPosition(data)
  }

 
  
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

  

  let currentWeather= async()=>{

    
      let {data}= await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${geoPosition.latitude}&lon=${geoPosition.longitude}&appid=${apiKey}`)
      console.log(data);
      setWeatherDetails({...data,tempType:'F'})
  
    }
    
  useEffect(()=>{
    getCurrentLocation()
    
  },[])

  useEffect(()=>{
    if(geoPosition.latitude){
  
     currentWeather()
      }
  },[geoPosition])

  
console.log(geoPosition);

  
return <div className='app-background' >
      
    <Navbar searchCity={searchCities} />
    <div className="table-details">
   <div>1</div>

  {weatherDetails.name && <CityCloud   city={weatherDetails.name}  countryCode={weatherDetails.sys.country} temp={weatherDetails.main.temp} tempType={weatherDetails.tempType}  max={weatherDetails.main.temp_max} min={weatherDetails.main.temp_min} day={new Date().getDay()} wType={weatherDetails.weather[0].main} /> }
    </div>

</div>

}

export default App 