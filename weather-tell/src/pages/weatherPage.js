import TodayWeather from './TodayWeather';
import WeatherRow from './weatherRow';
import React, { useEffect, useState } from 'react';
import { fetchCoordinates } from '../components/weather';
import { getWeatherDetails } from '../components/weatherapi';
import { convertData, formatter } from '../components/weather.js';


function WeatherPage() {
    const noDays = 15;
    const [iscelcius, setiscelcius] = useState(false);
    const [weekData, setWeekData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentWeather, setCurrentWeather] = useState({});
    const isDay = currentWeather.isDay ?? true;

    useEffect(() => {
        fetchCoordinates(async (latitude, longitude) => {
            const weatherData = await getWeatherDetails({ latitude, longitude, number_days: noDays});
            console.log(weatherData);
            setWeekData(convertData(weatherData.daily));
            let todayWeather = weatherData.current_weather;
            todayWeather.isDay = todayWeather.is_day;
            todayWeather.time = formatter(todayWeather.time);
            todayWeather.weatherCode = todayWeather.weathercode;
            delete todayWeather.is_day;
            delete todayWeather.weathercode;
            setCurrentWeather(todayWeather);
            setIsLoading(false);
        });



    }, []);

    if (!isLoading) {

        console.log(weekData);
        return (
            <>
            <div className={`comp${!isDay ? 'dark' : ''}`} style={{paddingTop: '20px'}}>
                <h2>Weather-Info</h2>
                <button
                    className="ui primary button"
                    style={{ float: 'right', margin: '10px' }}
                    onClick={() => setiscelcius(!iscelcius)}
                >
                    {iscelcius ? '°C' : '°F'}
                </button>
                <TodayWeather iscelcius={iscelcius} weather={currentWeather} />
                <div className={`table ${!isDay ? 'dark' : ''}`} style={{ marginTop: '20px' }}>
                    <table className={`table ${!isDay ? 'dark' : ''}`} >
                        <thead className={`${!isDay ? 'dark' : ''}`}>
                            <tr>
                                <th>Day</th>
                                <th>Weather</th>
                                <th>Min Temperature</th>
                                <th>Max Temperature</th>
                                <th>Weather Code</th>
                                <th>Max Wind Speed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weekData.map((weather, index) => (
                                <WeatherRow key={index} iscelcius={iscelcius} weather={weather} />
                            ))
                            }
                        </tbody>
                    </table>
                </div>
                

            </div>
            <div className={`{isDay ? 'footer' : 'footer dark'}`}>
                    <p>Weather data provided by <a href='https://open-meteo.com/en/docs'>Open Meteo</a></p>
                </div>
            </>
        );
    }
    else return (
        <h1 className='ui header'>Loading...</h1>
    );
}
export default WeatherPage;
