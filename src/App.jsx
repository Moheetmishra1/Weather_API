import { useCallback, useEffect, useState } from 'react'

import './App.css'
import Navbar from './Navbar/navbar';
import axios from 'axios';
// import { CityCloud } from './cityCloud/cityCloud';
import MoreDetail from './MoreDetails/MoreDetail';
import WeatherForecastCard from './WeatherForecast/WeatherForecastCard ';
import CityWeather from './cityCloud/CityWeather/CityWeatherList';
import CityCloud from './cityCloud/cityCloud';
import { API_KEY } from './cityCloud/API';

function App() {
  // let [cities, setCities] = useState([]);
  let [geoPosition,setgeoPosition]=useState({longitude:'',latitude:''})
  let [weatherDetails, setWeatherDetails]= useState({})
  let [recoreds,setRecoreds]= useState([])
  let [reload,setReload]=useState(false)
  let tempType='F'
 
  let apiKey=API_KEY ;
  function searchCities(data){
    setgeoPosition(data)
  }



const update = useCallback(()=>{
  setReload(!reload)
  console.log("updated");
  
},[reload])

const changeState = useCallback((data)=>{
  setgeoPosition(data)

},[geoPosition])



 
  
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

    try{
      let {data}= await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${geoPosition.latitude}&lon=${geoPosition.longitude}&appid=${apiKey}`)
      
      setWeatherDetails({...data,tempType})
      
      let m= await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=1489a1352f294047b0860326240811&q=${data.name}&days=5&aqi=no&alerts=no`);
      setRecoreds(m.data.forecast.forecastday)
     
        localStorage.setItem('CityName',JSON.stringify(data.name))
    }catch(err){
      console.log(err);
      
    }
      
      
  
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
      
    <Navbar searchCity={searchCities} />
    <div className="table-details">
   <div className=' list'>
  <CityWeather update={reload} changeState={changeState} />

   </div>
    <div>

  {weatherDetails.name && <CityCloud  update={update}  city={weatherDetails.name} lat={geoPosition.latitude} lon={geoPosition.longitude} id={weatherDetails.id}  countryCode={weatherDetails.sys.country} temp={weatherDetails.main.temp} tempType={weatherDetails.tempType}  max={weatherDetails.main.temp_max} min={weatherDetails.main.temp_min} day={2} wType={weatherDetails.weather[0].main} /> }
   {weatherDetails.name &&  <section className='details'>
      <MoreDetail  data={weatherDetails.main.feels_like} dataType={'◦'+tempType} category="Real Feel" />
      <MoreDetail  data={weatherDetails.wind.speed} dataType={'Km/h'} category="wind Speed" />
      <MoreDetail  data={weatherDetails.main.humidity} dataType={'%'} category="humidity" />
      <MoreDetail  data={weatherDetails.main.pressure} dataType={'hPa'} category="pressure" />
     
    </section>}

  <div className='app-container'>
    <div className="card-container">
  {recoreds.map(a=>{
     const sampleWeatherData = {
      date: a.date,
      day: {
          maxtemp_c: a.day.maxtemp_c,
          mintemp_c: a.day.mintemp_c,
          condition: {
              text: a.day.condition.text,
              icon: a.day.condition.icon,
          },
      },
  };
    return <WeatherForecastCard key={a.date} weatherData={sampleWeatherData} />
  })}
  </div>
  </div>
    </div>


    </div>

</div>

}

export default App 