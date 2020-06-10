import './Hamburger.scss'
import React, {useContext} from 'react';
import {HamburgerContext} from '../../contexts/HamburgerContext'

const Hamburger = () => {
  const {status, toggleMenu, visible} = useContext(HamburgerContext);
  const show = visible ? ('hamburger hamburger-show') : ('hamburger  hamburger-hide')
  return (
    <div className={show} onClick={() => toggleMenu()}>
      <span className={status}></span>
      <span className={status}></span>
      <span className={status}></span>
    </div>
  )
}
export default Hamburger;