import React from "react";

// for current weather info
function CurrentWeather(props) {
  
  const data = props.data;

  // Check if the data exists 
  if (!data || !data.main || !data.weather) {
    
    return null;
  }

  
  const tempInCelsius = data.main.temp;
  const roundedTemp = Math.round(tempInCelsius);

  // description of the weather
  const weatherArray = data.weather;
  const weatherDetails = weatherArray[0];
  const weatherDescription = weatherDetails.description;

  // icon code
  const iconCode = weatherDetails.icon;

 
  const iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";

  
  const cityName = data.city;

 
  return (
    <div className="current-weather">
      {}
      <h2>Current Weather in {cityName}</h2>

      {}
      <div className="weather-info">
        {}
        <img src={iconUrl} alt={weatherDescription} />

        {/* Temperature and weather description */}
        <p>
          {roundedTemp}°C - {weatherDescription}
        </p>
      </div>
    </div>
  );
}


export default CurrentWeather;
