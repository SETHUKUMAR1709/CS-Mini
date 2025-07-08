import Axios from 'axios';

const isDay = new Date().getHours() >= 6 && new Date().getHours() < 18;
const URL = 'https://api.open-meteo.com/v1/forecast';

const convertDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-CA', options).replace(/\//g, '-');
}

const getWeatherDetails = async ({latitude, longitude, number_days}) => {
    const start = new Date();
    const weatherInfo = await Axios.get(URL, {
        params: {
            latitude,
            longitude,
            current_weather: true,
            timeZone: 'Asia/Kolkata',
            daily: [
                'temperature_2m_max',
                'temperature_2m_min',
                'weathercode',
                'precipitation_sum',
                'windspeed_10m_max',
                'winddirection_10m_dominant',
                'sunrise',
                'sunset',      
            ],
            start_date: convertDate(start),
            end_date: convertDate(new Date(start.setDate(start.getDate() + number_days)))
        }
})
return weatherInfo.data;
}

export { isDay, getWeatherDetails };
