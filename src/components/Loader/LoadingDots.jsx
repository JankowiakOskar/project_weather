import './LoadingDots.scss'
import React, { useContext } from 'react';
import { LoadingDataContext } from '../../contexts/LoadingDataContext';
import Loader from 'react-loader-spinner'

const LoadingDots = props => {
  const {isLoading} = useContext(LoadingDataContext);


  return (
    isLoading && (
      <div className="dots-ctn">
        <Loader className="loader" type="ThreeDots" color="#011140" height="100" width="100" />
      </div>
    )
  )
}

export default LoadingDots