import './StartBox.scss';
import React from 'react';
import {Link} from 'react-router-dom'
import {config, useSpring, animated} from 'react-spring';

const StartBox = () => {

  const anim = useSpring({
    config: config.wobbly,
    from: {
      transform: 'translateY(-30%)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
    delay: 600,
    
  })

  return(
    <div className="box-container">
      <animated.div className="box" style={anim}>
        <p className="description-app">Aplikacja pogodowa która pozwala Ci sprawdzić pogodę w dowolnym mieście, oraz prognozę na cztery najbliższe dni
          </p>
        <p className="press-start">Naciśnij start, aby kontynuować</p>
        <Link to="/form/1"><button className="btn-start">Start</button></Link>
      </animated.div>
    </div>
  )
}





export default StartBox;