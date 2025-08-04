export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const geoApiOptions = {
  method: "GET",
  headers: {
    //GET city API
    "X-RapidAPI-Key": "a7ba04beecmshd0798aa4410aa6ap11587djsn0723e9cb778e", 
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const fetchCities = async (searchQuery) => {
  const url = `${GEO_API_URL}/cities?namePrefix=${encodeURIComponent(searchQuery)}`;
  const response = await fetch(url, geoApiOptions);
  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }
  const data = await response.json();
  return data;
};

// OpenWeather API
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "4eb00c94adc99a47cd66a7ae27b1af72";
