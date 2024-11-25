import _ from 'lodash';

export default function DisplayWeather(weatherData: {
  weatherData: {
    name: string;
    main: {
      temp_max: number;
      temp_min: number;
      temp: number;
      humidity: number;
      feels_like: number;
    };
    weather: [{ icon: string; main: string }];
    sys: { sunrise: number; sunset: number };
    wind: { speed: number };
  };
}) {
  const weatherDesc = _.get(weatherData, 'weatherData.weather[0]');

  console.log(weatherData.weatherData);

  function timeConverter(unixTimestamp: number) {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    return date.toLocaleTimeString();
  }
  const weatherObj = {
    location: weatherData.weatherData.name,
    tempMax: weatherData.weatherData.main.temp_max,
    tempMin: weatherData.weatherData.main.temp_min,
    temp: weatherData.weatherData.main.temp,
    tempFeel: weatherData.weatherData.main.feels_like,
    icon: weatherDesc?.icon,
    description: weatherDesc?.main,
    sunrise: timeConverter(weatherData.weatherData.sys.sunrise),
    sunset: timeConverter(weatherData.weatherData.sys.sunset),
    humidity: weatherData.weatherData.main.humidity,
    wind: weatherData.weatherData.wind.speed,
  };

  return (
    <div className=" bg-transparent border border-yellow-300 rounded-xl">
      <h2 className="text-3xl">The weather today</h2>
      <span className="text-xl text-white p-1">
        <strong>Your chosen location: {weatherObj?.location}</strong>
      </span>
      {/* <WeatherImage weatherObj={weatherObj} /> */}
      <ul>
        <li>{weatherObj?.description}</li>
        <li>Current temp: {weatherObj?.temp}ºC</li>
        <li>Feels like: {weatherObj?.tempFeel}ºC</li>
        <li>Max temp: {weatherObj?.tempMax}ºC</li>
        <li>Min temp: {weatherObj?.tempMin}ºC</li>
        <li>Humidity: {weatherObj?.humidity}%</li>
        <li>Wind speed: {weatherObj?.wind} mph</li>
      </ul>
      <span>
        <p>Sunrise: {weatherObj?.sunrise}</p>
        <p>Sunset: {weatherObj?.sunset}</p>
      </span>
    </div>
  );
}
