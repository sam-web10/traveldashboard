import { useState, useEffect } from "react";
import './index.css';
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import CurrencyRow from "./components/currency-row/CurrencyRow"; 
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api/api";

// currency API
const BASE_URL = "https://v6.exchangerate-api.com/v6/a78c357197d0f964da641d34/latest/USD";

function App() {
  // weather  states
  const [weatherDataNow, setWeatherDataNow] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [errorWhileGettingWeather, setErrorWhileGettingWeather] = useState(null);

  // currency  states
const [allCurrencyList, setAllCurrencyList] = useState([]);
const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("");
  const [conversionRate, setConversionRate] = useState(null);
  const [userTypedAmount, setUserTypedAmount] = useState(1);
     const hardcodedFromCurrency = "USD";

  const valueFromCurrency = userTypedAmount;
  const valueToCurrency = userTypedAmount * (conversionRate || 0);

  // when user selets a city
  const handleUserSelectedCityFromSearch = (searchResultObject) => {const coords = searchResultObject.value.split(" ");
    const latitude = coords[0];
    const longitude = coords[1];

    //  fetch both 
    const url1 = `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;
    const url2 = `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;

    fetch(url1)
    .then((res1) => res1.json())
    .then((weatherNowData) => {
        fetch(url2)
        .then((res2) => res2.json())
        .then((weatherForecastData) => {
           // saving both
    setWeatherDataNow({ city: searchResultObject.label, ...weatherNowData });
    setForecastData({ city: searchResultObject.label, ...weatherForecastData });
     setErrorWhileGettingWeather(null);})

       .catch((errorForecast) => {console.log("forecast error", errorForecast);
        setForecastData(null);
            setErrorWhileGettingWeather("Could not get forecast");});
      })


      .catch((errorNow) => {
console.log("weather error", errorNow);
       setWeatherDataNow(null);
        setForecastData(null);
        setErrorWhileGettingWeather("Could not get current weather");
      }); };

  // FOR loading currency list once at beginning
useEffect(() => {
fetch(BASE_URL)
 .then((res) => res.json())
  .then((data) => {
      const listOfCurrencies = Object.keys(data.conversion_rates);
        setAllCurrencyList(listOfCurrencies);
        setSelectedCurrencyTo(listOfCurrencies[0]);
        setConversionRate(data.conversion_rates[listOfCurrencies[0]]);})

      .catch((err) => {console.log("currency data fetch failed", err);
});
  }, []);

  // when user changes the toCurrency
  useEffect(() => {
if (selectedCurrencyTo != null && selectedCurrencyTo !== "") {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((dataAgain) => {
setConversionRate(dataAgain.conversion_rates[selectedCurrencyTo]);
        }); }
  }, [selectedCurrencyTo]);

  // if user changes the input number
  function whenUserTypesNewAmount(e) {
    setUserTypedAmount(e.target.value);
  }

  return (
    <div className="app-container bg-sky-50 min-h-screen ">

      <h1 text-center mb-4 text-4xl font-bold font-sans >Travel-dashboard</h1>

      <Search onSearchChange={handleUserSelectedCityFromSearch} />

      {errorWhileGettingWeather !== null && (
        <div className="error-box">{errorWhileGettingWeather}</div>
      )}

      {/* Show Current Weather if available */}
      {weatherDataNow ? <CurrentWeather data={weatherDataNow} /> : null}

      {/* Optional: forecast (commented out) */}
      {/* {forecastData && <Forecast data={forecastData} />} */}

      <div className="currency-section border-2 border-gray-300 p-6 rounded-lg shadow-md bg-white max-w-md mx-auto mt-6">

        <h2 className="mt-5 text-2xl font-semibold font-sans">Currency Converter</h2>
        
        <CurrencyRow
          currencyOptions={["USD"]}
          selectedCurrency="USD"
          onChangeCurrency={() => {}}
          onChangeAmount={whenUserTypesNewAmount}
          amount={valueFromCurrency}
        />
        <div className="equals"> = </div>
        <CurrencyRow
          currencyOptions={allCurrencyList}
          selectedCurrency={selectedCurrencyTo}
          onChangeCurrency={(e) => setSelectedCurrencyTo(e.target.value)}
          onChangeAmount={() => {}}
          amount={valueToCurrency}
        />
      </div>
    </div>
  );
}

export default App;
