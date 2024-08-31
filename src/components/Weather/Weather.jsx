import React, { useRef, useState, useEffect } from 'react'
import './Weather.css'

const Weather = () => {

    const [weatherData, setWeatherData] = useState({})

    const allIcons = {
        "01d": "icons/clear.png",
        "01n": "icons/clear.png",
        "02d": "icons/cloud.png",
        "02n": "icons/cloud.png",
        "03d": "icons/cloud.png",
        "03n": "icons/cloud.png",
        "04d": "icons/drizzle.png",
        "04n": "icons/drizzle.png",
        "09d": "icons/rain.png",
        "09n": "icons/rain.png",
        "10d": "icons/rain.png",
        "10n": "icons/rain.png",
        "13d": "icons/snow.png",
        "13n": "icons/snow.png",
    }

    const search = async (city) => {
        try {
            const url = `${import.meta.env.VITE_WEATHER_API}?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`
            const reposne = await fetch(url);
            const data = await reposne.json();
            console.log(data);
            setWeatherData({
                humidity: data?.main?.humidity || 0,
                windSpeed: data?.wind?.speed || 0,
                temperature: data?.main?.temp || 0,
                location: data?.name || 'NaN',
                description: data?.weather[0]?.description || 'NaN',
                icon: allIcons[data?.weather[0].icon] || 'icons/clear.png'
            });
        } catch (error) {
            console.log('Error while fetching the weather data', error);
        }
    }

    useEffect(() => {
        console.log('Fetching weather data');
        search('Chennai')
        searchRef.current.focus()
    }, [])

    const searchRef = useRef()

    const handleSearch = () => {
        searchRef.current.value === '' ? searchRef.current.focus() : search(searchRef.current.value)
    }
    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={searchRef} type="text" placeholder='Search' />
                <button onClick={handleSearch} type='submit'>
                    <img src='icons/search.png' alt='search' />
                </button>
            </div>
            {weatherData ? <>
                {/* <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="weather-icon" className='weather-icon' /> */}
                <img src={weatherData.icon} alt="weather-icon" className='weather-icon' />
                <span className='weather-desc'>{weatherData.description}</span>
                <p className='temperature'>{Math.round(weatherData.temperature)}°C</p>
                <p className='location'>{weatherData.location}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src="icons/humidity.png" alt="humidity-icon" />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src="icons/wind.png" alt="wind-icon" />
                        <div>
                            <p>{weatherData.windSpeed} m/s</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div></> : <></>}
        </div>
    )
}

export default Weather