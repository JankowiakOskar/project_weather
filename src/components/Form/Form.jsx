import './Form.scss';
import React, { useState,useContext, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { WeatherContext } from '../../contexts/WeatherContext';
import { HamburgerContext } from '../../contexts/HamburgerContext';
import { LoadingDataContext } from '../../contexts/LoadingDataContext';
import Loader from 'react-loader-spinner'

const Form = () => {
  const { setCityObj, toggleMessage } = useContext(WeatherContext);
  const { setVisibility } = useContext(HamburgerContext);
  const { isLoading, loadingData } = useContext(LoadingDataContext);
  const [city, setCity] = useState('');
  let history = useHistory();
  let { id } = useParams();

  const buttonData= isLoading ? ( 
    <span><Loader className="loading-circles" type="Circles" color="#011140" height={20} width={20}/>Pobieranie danych...</span>
  ) : 
  (<span><i className="fas fa-temperature-high"></i>Sprawdź pogodę...</span>)

  const placeHolder = isLoading? ("") : "Wpisz nazwę miasta...";

  // Show hamburger after render form
  useEffect(() => {
    setVisibility(true);
  })

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCityObj({
      cityName: city,
      id
    })
    history.push(`/form/${id}/weather`);
    setCity('');
    toggleMessage();
  }

  return ( 
    <form className="form" onSubmit={(e) => {
      handleSubmit(e);
      loadingData();
    }}>
      <div className="input-icon">
        <input type="text" placeholder={placeHolder} value={city} onChange={handleChange} disabled={isLoading}  className="search"/>
        <i className="fas fa-search-location"></i>
      </div>
      <button className="btn-weather" disabled={isLoading}>
        {buttonData}
      </button>
    </form>
   );
}
 
export default Form;