const fetchCoordinates = (callback) => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            callback(latitude, longitude);
        },
        (error) => {
            console.error('Error fetching location:', error);
        }
    );

};

const formatter = (input) => {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Weather codes mapping

function convertData(weatherInfo){
    
    let data = [];
    for(let i = 0; i < weatherInfo.time.length; i++){
        data.push({
        date: formatter(weatherInfo.time[i]),
        temperatureMax: weatherInfo.temperature_2m_max[i],
        temperatureMin: weatherInfo.temperature_2m_min[i],
        weatherCode: weatherInfo.weathercode[i],
        precipitationSum: weatherInfo.precipitation_sum[i],
        windSpeedMax: weatherInfo.windspeed_10m_max[i],
        windDirectionDominant: weatherInfo.winddirection_10m_dominant[i],
        sunrise: (weatherInfo.sunrise[i]),
        sunset: (weatherInfo.sunset[i])
        });
    };
    return data;
}

const toFarenheit = (celsius) => {
    return ((celsius * 9/5) + 32).toFixed(1);
}




export {fetchCoordinates, convertData, toFarenheit, formatter};