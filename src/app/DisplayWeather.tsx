export default function DisplayWeather(weatherData) {
  console.log(weatherData.weatherData);

  const weatherObj = {
    location: weatherData.weatherData.name,
    tempMax: weatherData.weatherData.main.temp_max,
  };

  return (
    <div className=" bg-transparent border border-yellow-300 rounded-xl">
      <p className="text-5xl">Weather</p>
      <span className="text-xl text-white">
        <strong>{weatherObj?.location}</strong>
      </span>
      <p>{weatherObj?.tempMax}</p>
    </div>
  );
}
