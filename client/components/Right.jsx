import React from 'react';
import Connect from './Connect.jsx'

const Right = function({currentState,handleQueueClick,handleDeviceClick,handleVolumeClick}){
  return(
    <div className = 'controller_right'>
      <div className = "controller-right-inner">
        <div className="right-controls">
          <div className="queue">
            <div className={currentState.queueWrapper}>
              <button className={currentState.queueIcon} onClick={(event)=>handleQueueClick(event)}></button>
            </div>
          </div>
          <div className="extra-controls">
            <span className="device-picker">
              <button className="control-button device-icon" onClick={(event)=>handleDeviceClick(event)}></button>
              <Connect currentState={currentState}/>
            </span>
          </div>
          <div className="volume-bar" dir= 'ltr'>
            <button className={currentState.volumeIcon} onClick={(event)=> handleVolumeClick(event)}></button>
            <div className="progress-bar progress-bar--is-active">
              <div className="middle-align progress-bar__bg">
                <div className="progress-bar__fg_wrapper">
                    <div className="progress-bar__fg" style={currentState.volumeRight}></div>
                </div>
                <button className=" middle-align progress-bar__slider" style={currentState.volumeLeft}></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Right;