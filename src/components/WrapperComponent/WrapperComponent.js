import './WrapperComponent.scss'
import React, { useContext } from 'react'
import { HamburgerContext } from '../../contexts/HamburgerContext'

const WrapperComponent = ({children}) => {
  const {status} = useContext(HamburgerContext);
  const className = status === 'open' ? ("wrapper wrapper--active") : ("wrapper wrapper--disabled")

  return (
    <div className={className}>
      {children}
    </div>
  )
}


export default WrapperComponent;