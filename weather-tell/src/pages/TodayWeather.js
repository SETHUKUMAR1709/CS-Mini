import React from 'react'
import { toFarenheit } from '../components/weather'
import {Codes} from './weatherRow'
const TodayWeather = ({iscelcius, weather}) => {
    console.log(weather);
    const metric = iscelcius ? '°C' : '°F';
  return (
    <div>
        <h3 > {`MAX: ${iscelcius ? weather.temperature : toFarenheit(weather.temperature)} ${metric} | ${Codes[weather.weatherCode]}`}</h3>
    </div>
  )
}

export default TodayWeather