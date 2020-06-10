import './Menu.scss'
import React, { useContext} from 'react';
import {Link} from 'react-router-dom';
import {v4} from 'uuid';
import { HamburgerContext } from '../../contexts/HamburgerContext';
import { WeatherContext} from '../../contexts/WeatherContext';
import {LoadingDataContext} from '../../contexts/LoadingDataContext';


const HamburgerMenu = () => {
  const { status, toggleMenu} = useContext(HamburgerContext);
  const { locations, toggleMessage } = useContext(WeatherContext);
  const {loadingData } = useContext(LoadingDataContext);
  const className = status === 'open' ? ('menu menu--open') : ('menu menu--close')
  const menuItems = () => {
    if (locations.length) {
      return (
        locations.map( location => {
          let url = `/form/${location.id}/weather`
          return (
            <Link className="link" to={url} key={location.id} onClick={() => {
              toggleMenu();
              toggleMessage(false);
              loadingData();
              }}>
              <li className="menu-item" >
                <p className="menu-city-name">{location.city}</p>
                <div className="weather-icon">
                  <img src={'http://openweathermap.org/img/w/' + location.iconCode + '.png'} alt="weather"/>
                </div>
                <p className="current-temp">{location.curr_temp} &#8451;</p>
              </li>
           </Link>
          )
        })
      )
    }
  }

  const addNextPlace = () => {
    let id = v4();
    let url = `/form/${id}/weather`
    if(!locations.length || (!locations[locations.length] && locations.length < 3)) {
      return (
        <li className="menu-add-item" key={v4()}>
          <p className="add-loc">Dodaj lokalizację</p>
          <Link className="link" to={url} onClick={() => {
            toggleMenu();
            toggleMessage(false);
          }}> 
            <button className="add-place"><i className="fas fa-plus"></i></button>
          </Link>
        </li>
      )
    }
  }
  
  return ( 
    <div className={className}>
      <ul>
      {menuItems()}
      {addNextPlace()}
      </ul>
    </div>
   );
}
 
export default HamburgerMenu;