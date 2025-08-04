import React from "react";


function CurrentWeather(props) {
  
  const data = props.data;


  if (!data || !data.main || !data.weather) {
   
    return <div>Weather data not available.</div>;
  }

 
  const temp = data.main.temp;
  const roundedTemp = Math.round(temp); // for round off 

  
  const weatherInfo = data.weather[0]; 
  const description = weatherInfo.description; 
  const iconCode = weatherInfo.icon; 

  // icon code url
  const iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";

  
  const cityName = data.city;

  // weather information 
  return (
    <div className="current-weather">
      {}
      <h2>Current Weather in {cityName}</h2>

      {} 
      <div className="weather-info">
        {}
        <img 
          src={iconUrl} 
          alt={description} 
        />

        {}
        <p style={{ fontSize: "24px", margin: "10px 0" }}>
          {roundedTemp}°C - {description}
        </p>
      </div>
    </div>
  );
}


export default CurrentWeather;
