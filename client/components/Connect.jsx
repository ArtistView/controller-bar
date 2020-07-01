import React from 'react';

const Connect = function({currentState}){
  //connect displays a device connect instuction window if true
  //has no functionality besides display
  if(currentState.deviceState===true)
  {
    return(
      <div className="connect-device-list-container connect-device-list-container--is-visable">
      <div className="connect-list">
        <div className="connect-title" as="div" style={{color:'rgb(255,255,255)'}}>
          <h3 className="connect-title-text" tabIndex="-1">Connect to a device</h3>
          <a className="connect-title-help question-icon"></a>
        </div>
        <div className="connect-header">
          <img className="connect-image" src="https://song-for-fake-spotify.s3-us-west-1.amazonaws.com/Screen+Shot+2020-06-22+at+10.43.15+PM.png"></img>
        </div>
        <div className="connect-info">
          <p>Play and control spotify on all your devices.</p>
          <p>Start spotify on another device and it will magically appear here.</p>
          <a className="connect-device-button">Learn more</a>
        </div>
      </div>
     </div>
    )
  }
  if(currentState.deviceState===false){
    return (
      <div></div>
    )
  }
}

export default Connect;



