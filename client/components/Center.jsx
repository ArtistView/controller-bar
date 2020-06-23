import React from 'react';

const Center= function({currentState,handleShuffleClick,handleSkipBackClick,handlePlayClick,handleSkipForwardClick,handleRepeatClick}){
  return(
    <div className= "controller_center">
      <div className = "controls-container" dir="ltr">
        <div className="control-buttons">
          <div className= {currentState.shuffleWrapper}>
            <button className= {currentState.shuffleIcon} onClick={(event)=>handleShuffleClick(event)}>
            </button>
          </div>
          <div className= "control-button-wrapper">
            <button className = {currentState.skipBackIcon} onClick={(event)=>handleSkipBackClick(event)}></button>
          </div>
          <div className= "control-button-wrapper">
            <button className={currentState.playIcon} onClick={(event)=>handlePlayClick(event)}></button>
          </div>
          <div className= "control-button-wrapper">
            <button className={currentState.skipForwardIcon} onClick={(event)=> handleSkipForwardClick(event)}></button>
          </div>
          <div className= {currentState.repeatWrapper}>
            <button className={currentState.repeatIcon} onClick={(event)=> handleRepeatClick(event)}></button>
          </div>
        </div>
        <div className = "play-bar">
          <div className="time-progress left-time">1:58</div>
          <div className="progress-bar">
            <div className="middle-align progress-bar__bg">
              <div className="progress-bar-wrapper">
                <div className="progress-bar-change" style={{transform: 'translateX(-34.4635%)'}}></div>
              </div>
              <button className="middle-align progress-bar-slide" style={{left:'65.5365%'}}></button>
            </div>
          </div>
          <div className="time-progress right-time">3:25</div>
        </div>
      </div>
    </div>
  )
}

export default Center;