import './InfoBox.scss'
import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import {WeatherContext} from '../../contexts/WeatherContext'


const InfoBox = (props) => {
  const [buttonClicked, setClick] = useState(false);
  const { locations, matchID } = useContext(WeatherContext);
  const { id } = useParams();
  const location = matchID(locations, id);

  const delayLeft = (timeDelay) => {
    const { history } = props;
    setTimeout(() => {
      history.push(`/form/${id}/weather`)
    },timeDelay)
  }

  const handleClick = () => {
    setClick(!buttonClicked)
    delayLeft(450);
  }

  const handleExit = () => {
    delayLeft(50)
  }

  const iconClasses = buttonClicked ? ('fas fa-hand-point-left back-icon back-icon--active') : ('fas fa-hand-point-left back-icon back-icon--disabled')

  const txtBtnClass = buttonClicked ? ('text text--move') : ('text')

  const infoItems = location.length ? (
    location.map(info => {
      return (
        <div className="info-box" key={info.id}>
          <h2 className="title-info">Dane dotyczące obecnej pogody</h2>
          <div className="info-item desc-weather"><span>pogoda:</span><p>{info.description}</p></div>
          <div className="info-item wind"><span>prędkość wiatru:</span><p>{info.wind_speed} km/h</p></div>
          <div className="info-item humidity"><span>wilogotność:</span><p>{info.humidity} %</p></div>
          <div className="info-item feels-temp"><span>odczuwalna temperatura:</span><p>{info.feels_like} &#8451;</p></div>
          <div className="info-item max-temp"><span>maksymalna temperatura:</span><p>{info.max_temp} &#8451;</p></div>
          <div className="back-item">
            <button className="back-btn" onClick={() => handleClick()}>
              <i className={iconClasses}></i><span className={txtBtnClass}>Powrót</span>
            </button>
          </div>
          <button className="close-btn" onClick={() => handleExit()}><span>X</span></button>
        </div>
      )
    })
  ) : (null)

  return ( 
    <div className="container-info">
      {infoItems}
    </div>
   );
}
 
export default InfoBox;