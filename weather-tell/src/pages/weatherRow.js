import React from 'react'
import { toFarenheit } from '../components/weather';

    const Codes = {
  "0": "Clear sky",
  "1": "Mainly clear",
  "2": "Partly cloudy",
  "3": "Overcast",
  "45": "Fog",
  "48": "Depositing rime fog",
  "51": "Drizzle: Light intensity",
  "53": "Drizzle: Moderate intensity",
  "55": "Drizzle: Dense intensity",
  "56": "Freezing Drizzle: Light intensity",
  "57": "Freezing Drizzle: Dense intensity",
  "61": "Rain: Slight intensity",
  "63": "Rain: Moderate intensity",
  "65": "Rain: Heavy intensity",
  "66": "Freezing Rain: Light intensity",
  "67": "Freezing Rain: Heavy intensity",
  "71": "Snowfall: Slight intensity",
  "73": "Snowfall: Moderate intensity",
  "75": "Snowfall: Heavy intensity",
  "77": "Snow grains",
  "80": "Rain showers: Slight",
  "81": "Rain showers: Moderate",
  "82": "Rain showers: Violent",
  "85": "Snow showers: Slight",
  "86": "Snow showers: Heavy",
  "95": "Thunderstorm: Slight or moderate",
  "96": "Thunderstorm with slight hail",
  "99": "Thunderstorm with heavy hail"
};

const formatter = (input) => {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
};




const weatherDetails = ({iscelcius, weather}) => {
 return(
    <div className={`weather-details ${!iscelcius ? 'dark' : ''}`}>
        <h3>{weather.date}</h3>
        <p>Weather: {Codes[weather.weatherCode]}</p>
        <p>Sunrise: {formatter(weather.sunrise)}</p>
        <p>Sunset: {formatter(weather.sunset)}</p>
        <p>Max Temperature: {iscelcius ? weather.temperatureMax : toFarenheit(weather.temperatureMax)} {iscelcius ? '°C' : '°F'}</p>
        <p>Min Temperature: {iscelcius ? weather.temperatureMin : toFarenheit(weather.temperatureMin)} {iscelcius ? '°C' : '°F'}</p>
        <p>Wind Speed: {weather.windSpeedMax} Km/h</p>
    </div>
 );
}



const WeatherRow = ({iscelcius, weather}) => {
  const [visible, setVisible] = React.useState(false);
    return (
    <tr onMouseEnter={setVisible.bind(null, true)} onMouseLeave={setVisible.bind(null, false)}>
        
        <td>{visible ? 
          <section style={{display: visible ? 'block' : 'none', position: 'absolute', width: 'fit-content', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
          {visible && weatherDetails({iscelcius, weather})}
          </section>
          : weather.date}</td>
        <td>Sunny</td>
        <td>{iscelcius ? weather.temperatureMax : toFarenheit(weather.temperatureMax)} {iscelcius ? '°C' : '°F'}</td>
        <td>{iscelcius ? weather.temperatureMin : toFarenheit(weather.temperatureMin)} {iscelcius ? '°C' : '°F'}</td>
        <td>{Codes[weather.weatherCode]}</td>
        <td>{weather.windSpeedMax} Km/h</td>
    </tr>
    

  )
}

export {Codes};
export default WeatherRow;