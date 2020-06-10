import React from 'react'
import './Navbar.scss'
import Hamburger from '../Hamburger/Hamburger';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container-navbar">
        <h1 className="title-app"><span className="title">Weather App</span><i className="fas fa-cloud-sun"></i></h1>
        <Hamburger/>
      </div>
    </div>
  )
}



export default Navbar;