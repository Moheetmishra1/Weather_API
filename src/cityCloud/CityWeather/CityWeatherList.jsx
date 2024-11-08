import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CityWeather.css"

const CityWeather = ({update,changeState}) => {
    const [cities, setCities] = useState([]);
    const [cityName, setCityName] = useState('');
    
    const fetchWeather = async (city) => {
        try {
            const {data} = await axios.get(`http://localhost:3000/cities`);
            data.sort((a,b)=>a-b);

            setCities(data.filter((city,index)=>city.city !== data[index+1]?.city))
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    };

    function onOpen(data){
        
        changeState({longitude:data.lon,latitude:data.lat})

    }


    // Function to add a city
    const addCity = async () => {
        if (cityName) {
            const weatherData = await fetchWeather(cityName);
            if (weatherData) {
                setCities([...cities, { name: weatherData.name, temp: weatherData.main.temp }]);
                setCityName('');
            }
        }
    };

    // Function to remove a city
    const removeCity = async (id) => {
      try{
        
        let {data}= await  axios.delete(`http://localhost:3000/cities/${id}`);
        console.log(data);
        
        setCities(cities.filter((a,idx)=>a.id!== id));
      }catch(err){
        console.log("Error ",err);
        
      }
    };

    // Function to update weather for all cities
    const updateWeather = async () => {
        const updatedCities = await Promise.all(cities.map(async (city) => {
            const weatherData = await fetchWeather(city.name);
            return weatherData ? { name: weatherData.name, temp: weatherData.main.temp } : city;
        }));
        setCities(updatedCities);
    };

    useEffect(()=>{
        fetchWeather()
    },[update])

    return (
        <div className='cityWeatherList'>
            <h4>Favourite Cities</h4>
            {/* <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={addCity}>Add City</button> */}
            {/* <button onClick={updateWeather}>Update Weather</button> */}
            <header type="none">
                {cities.map((a,index) => (
                    <nav key={a.id}>
                      <div onClick={()=>onOpen(a)} > {a.city}</div> <div>: {a.countryCode} </div>
                        <button className='btn btn-danger  px-2' onClick={() => removeCity(a.id)}>🗑</button>
                    </nav>
                ))}
            </header>
        </div>
    );
};

export default CityWeather;