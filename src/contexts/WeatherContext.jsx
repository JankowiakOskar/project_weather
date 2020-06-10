import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {v4} from 'uuid';
const weatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const key = '63a21a6c979f617dacff641ec6752136';

export const WeatherContext = createContext();

const WeatherContextProvider = (props) => {
  const [locations, setLocations] = useState(() => {
    const localData = localStorage.getItem('places')
    return localData ? JSON.parse(localData) : []
  })
  const [cityObj, setCityObj] = useState('');
  const [isShown, setShown] = useState(false);
  
  useEffect(()=> {
    localStorage.setItem('places', JSON.stringify(locations))
  },[locations])
  

  useEffect(() => {
    if(cityObj) {
      axios.get(`${weatherAPI}${cityObj.cityName}&appid=${key}`)
      .then(res => {
        const location = res.data;
        const forecast4days = location.list.filter((value,index) => {
          const hourAndDate = value.dt_txt.split(' ')
          // Return forecast for 15:00 hour and current weather
          return hourAndDate[1] === "15:00:00" || index === 0 ? value : null
        })

        const currentWeather = forecast4days[0]

        const tempsCelsius = forecast4days.map(forecast => {
          return convertToCelsius(forecast.main.temp)
        })
        const daysDates = forecast4days.map(forecast => {
          return formatDate(forecast.dt_txt)
        })

        const newLocation = {
          id: cityObj.id,
          city: location.city.name,
          country: location.city.country,
          curr_temp: tempsCelsius[0],
          iconCode: currentWeather.weather[0].icon,
          feels_like: convertToCelsius(currentWeather.main.feels_like),
          pressure: currentWeather.main.pressure,
          humidity: currentWeather.main.humidity,
          max_temp: convertToCelsius(currentWeather.main.temp_max),
          min_temp: convertToCelsius(currentWeather.main.temp_min),
          description: iconToDesc(currentWeather.weather[0].icon),
          wind_speed: convertSpeed(currentWeather.wind.speed),
          forecast:[
            {id: v4(), date: daysDates[1], temp: tempsCelsius[1], iconCode: forecast4days[1].weather[0].icon },
            {id: v4(), date: daysDates[2], temp: tempsCelsius[2], iconCode: forecast4days[2].weather[0].icon },
            {id: v4(), date: daysDates[3], temp: tempsCelsius[3], iconCode: forecast4days[3].weather[0].icon },
            {id: v4(), date: daysDates[4], temp: tempsCelsius[4], iconCode: forecast4days[4].weather[0].icon },
          ]
        }

        const updatedLocations = [...locations].filter(location => location.id !== cityObj.id)
        updatedLocations.push(newLocation)
        setLocations(updatedLocations);
      })
      .catch(error => {
        if (error.response) {
          // remove last one el with the same ID if api response return error
          const copyLocations = [...locations]
          const newLocations = removeByID(copyLocations, cityObj.id)
          setLocations(newLocations);
          toggleMessage(true);
        }
      })
    }
  }, [cityObj])


  const convertToCelsius = temp => {
    const celsiusTemp = Math.floor(temp - 273.15)
    return celsiusTemp
  }
  
  const formatDate = dateString => {
    const dateAndHour = dateString.split(' ')
    const date = dateAndHour[0];
    return date;
  }

  const convertSpeed = mPerSecond => {
    const kmPerHour = mPerSecond * 3.6
    const roundSpeed = +kmPerHour.toFixed(2);
    return roundSpeed
  }
  // change icon Code to description of weather 
  const iconToDesc = icon => {
    const iconsDesc = {
      'czyste niebo': ['01d', '01n'],
      'kilka chmur': ['02d', '02n'],
      'rozproszone chmury': ['03d', '03n'],
      'rozbite chmury': ['04d', '04n'],
      'kropi deszcz': ['09d', '09n'],
      'pada deszcz': ['10d', '10n'],
      'burza': ['11d', '11n'],
      'pada śnieg': ['13d', '13n'],
      'mgła': ['50d', '50n'],
    }

    for (let weather  in iconsDesc) {
      const matchedIcon = iconsDesc[weather].filter(iconCode => iconCode === icon)
      // if passed icon is matched with one of array icons return key description of weather
      if (matchedIcon.length){
        return weather
      }
    }
  }

  const toggleMessage = boolean => setShown(boolean);

  const removeByID = (arr, id) => {
    return arr.filter(value => value.id !== id)
  }

  const matchID = (arr, id) => {
    return arr.filter(value => value.id === id)
  }

  


  return (
    <WeatherContext.Provider value={{ locations, setCityObj, isShown, toggleMessage, matchID }}>
      {props.children}
    </WeatherContext.Provider>
  );
}
 
export default WeatherContextProvider;