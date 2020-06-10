import React from 'react';
import Form from '../components/Form/Form'
import Navbar from '../components/Navbar/Navbar'
import Weather from '../components/Weather/Weather';
import StartBox from '../components/StartBox/StartBox'
import Menu from '../components/Menu/Menu'
import LoadingDots from '../components/Loader/LoadingDots'
import {BrowserRouter, Route} from "react-router-dom"
import WeatherContextProvider from '../contexts/WeatherContext';
import HamburgerContextProvider from '../contexts/HamburgerContext';
import InfoBox from '../components/InfoBox/InfoBox';
import LoadingDataProvider from '../contexts/LoadingDataContext';
import WrapperComponent from '../components/WrapperComponent/WrapperComponent';

function App() {
  return (
    <div className="App">
      <LoadingDataProvider>
        <HamburgerContextProvider>
          <WeatherContextProvider>

            <BrowserRouter>
              <WrapperComponent>
                <Navbar/>
                <Menu/>
                <Route exact path="/" component={StartBox}></Route>
                <Route path="/form/:id" component={Form}></Route>  
                <Route path="/form/:id/weather/" component={Weather}></Route>
                <Route exact path="/form/:id/weather/infobox" component={InfoBox}></Route>
                <LoadingDots/>
              </WrapperComponent>
            </BrowserRouter>
            
          </WeatherContextProvider>
        </HamburgerContextProvider>
      </LoadingDataProvider>
    </div>
  )
}
    

export default App;
