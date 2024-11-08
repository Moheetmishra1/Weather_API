import React, { memo } from 'react';
import  "./WeatherForecastCard .css"; // Import the CSS file

const WeatherForecastCard = ({ weatherData }) => {
    // Destructure the relevant properties from the weatherData
    const { date, day } = weatherData;
    const { maxtemp_c, mintemp_c, condition } = day;

    return (
        <div className="small-card">
            <h2>{date}</h2>
            <p>Max Temp: {maxtemp_c}°C</p>
            <p>Min Temp: {mintemp_c}°C</p>
            <p>Condition: {condition.text}</p>
            <img src={condition.icon} alt={condition.text} />
        </div>
    );
};

export default memo( WeatherForecastCard);