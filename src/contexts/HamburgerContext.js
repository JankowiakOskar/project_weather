import React, {createContext, useState} from 'react'

export const HamburgerContext = createContext();


const HamburgerContextProvider = (props) => {
  const [status, setStatus] = useState('close')
  const [visible, setVisibility] = useState(false);
  const toggleMenu = () => {
    setStatus(
      status === 'close' ? 'open' : 'close'
    )
  }
  return ( 
    <HamburgerContext.Provider value={{status, toggleMenu,visible, setVisibility}}>
      {props.children}
    </HamburgerContext.Provider>
  );

}
 
export default HamburgerContextProvider;