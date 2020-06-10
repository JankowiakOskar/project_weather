import './Weather.scss';
import React, {useContext} from 'react';
import { useParams, Link } from "react-router-dom";
import { WeatherContext } from '../../contexts/WeatherContext';
import { LoadingDataContext } from '../../contexts/LoadingDataContext';


const Weather = () => {
  const {locations, isShown, toggleMessage, matchID} = useContext(WeatherContext)
  const { isLoading } = useContext(LoadingDataContext)
  let { id } = useParams();
  const location = matchID(locations, id);
  const linkModal = `/form/${id}/weather/infobox`

  const handleClick = () => {
    toggleMessage(false)
  }


  const weather = location.length ? (location.map(location => {
    return (
      <div className="weather" key={location.id}>
        <div className="title-ctn">
          <h1 className="city-name">{location.city}, {location.country}</h1>
        </div>

        <div className="curr-weather">
          <div className="weatherIcon">
            <img src={'http://openweathermap.org/img/w/' + location.iconCode + '.png'} alt="weather-icon"/>
          </div>
          <p className="curr-temp">temperatura: <span className="unit-temp">{location.curr_temp} &#8451;</span></p>
          <p className="curr-pressure">ciśnienie:<span className="unit-pressure">{location.pressure} hPa</span></p>
        </div>

        <div className="more-info">
          <Link className="link" to={linkModal}>
            <button className="btn-info"><span>Więcej informacji</span><i className="fas fa-info-circle"></i></button>
          </Link>
        </div>

        <div className="forecast">
          <p className="description">Prognoza na cztery najbliższe dni</p>
          {location.forecast.map(day =>
            <div className="weather-item" key={day.id}>
              <p className="day">{day.date}</p>
              <div className="icon-ctn">
                <img src={'http://openweathermap.org/img/w/' + day.iconCode + '.png'} alt="weather-icon"/>
              </div>
              <p className="forecast-temp">{day.temp}&#8451;</p>
            </div>
           )}
        </div>

      </div>
      
    )
  })) : (null)

  const notFound = isShown ? (
    <div className="msg">
      <p>Twoja lokalizacja nie została znaleziona, spróbuj ponownie lub sprawdź pogodę dla miasta w pobliżu<i className="fas fa-eye-slash"></i></p>
      <button className="btn-ok" onClick={handleClick}>Ok</button>
    </div>
  ) : (null)

  return ( 
    <div className="container">
      { !isLoading && weather}
      { !isLoading && notFound}
    </div>
   );
}
 
export default Weather;