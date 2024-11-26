import _ from 'lodash';
import WeatherImage from './WeatherImage';

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
    <div className="container">
      <div className="flex flex-wrap w-full lg:w-auto">
        <div className="w-full lg:w-1/2 flex rounded-lg">
          <div className="rounded-lg py-6 pl-8 pr-32 w-full bg-blue-400 opacity-90 text-white">
            <div className="mb-20">
              <h2 className="font-bold text-xl leading-none pb-1">
                Currently in:
              </h2>
              <p className="flex aling-center opacity-75">
                <i className="bi bi-geo-alt-fill"></i>
                {weatherObj?.location}
              </p>
            </div>
            <div className="mb-10">
              <WeatherImage weatherObj={weatherObj} />
              <strong className="leading-none text-6xl block font-weight-bolder">
                {weatherObj?.temp}ºC
              </strong>
              <b className="text-2xl block font-bold">
                {weatherObj?.description}
              </b>
            </div>
            <div className="flex justify-between w-64 mb-4 w-full">
              <div className="w-auto font-bold text-90">
                Feels like:
              </div>
              <div className="w-auto text-right">
                {weatherObj?.tempFeel}ºC
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex ml-0">
          <div className="lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg w-full">
            <div className="flex justify-between w-64 w-full">
              <div className="w-auto font-bold uppercase text-90">
                <i className="bi bi-sunrise"></i> Sunrise
              </div>
              <div className="w-auto text-right">
                {weatherObj?.sunrise}
              </div>
            </div>
            <div className="flex justify-between w-64  mb-4 w-full">
              <div className="w-auto font-bold uppercase text-90">
                <i className="bi bi-sunset"></i> Sunset
              </div>

              <div className="w-auto text-right">
                {weatherObj?.sunset}
              </div>
            </div>
            <div className="flex justify-between w-64 w-full">
              <div className="w-auto font-bold uppercase text-90">
                <i className="bi bi-thermometer-high"></i> Max temp
              </div>
              <div className="w-auto text-right">
                {weatherObj?.tempMax}ºC
              </div>
            </div>
            <div className="flex justify-between w-64 mb-8 w-full">
              <div className="w-auto font-bold uppercase text-90">
                <i className="bi bi-thermometer-low"></i> Min temp
              </div>
              <div className="w-auto text-right">
                {weatherObj?.tempMin}ºC
              </div>
            </div>
            <div className="flex justify-between w-64 mb-4 w-full">
              <div className="w-auto font-bold uppercase text-90">
                <i className="bi bi-moisture"></i> Humidity
              </div>
              <div className="w-auto text-right">
                {weatherObj?.humidity} %
              </div>
            </div>
            <div className="flex justify-between w-64 mb-8 w-full">
              <div className="w-auto font-bold uppercase text-90">
                <i className="bi bi-wind"></i> Wind
              </div>
              <div className="w-auto text-right">
                {weatherObj?.wind} Mph
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
