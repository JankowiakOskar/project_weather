import React, {createContext, useState} from 'react';


export const LoadingDataContext = createContext();


const LoadingDataProvider = (props) => {
  const [isLoading, setLoading] = useState(false);

  const loadingData = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false)
    },800)
  }
  return ( 
    <LoadingDataContext.Provider value={{isLoading,loadingData}}>
      {props.children}
    </LoadingDataContext.Provider>
   );
}
 
export default LoadingDataProvider;