import React from 'react';
 
const Center= function({currentState,handleShuffleClick,handleSkipBackClick,handlePlayClick,handleSkipForwardClick,handleRepeatClick,songRange}){
  //center renders all the center components of app
  //music pogress bar
  //song duration / song current time
  //shuffle/prev/play/next/repeat buttons
  return(
    <div className="controller_center">
      <div className="controls-container" dir="ltr">
        <div className="control-buttons">
          <div className={currentState.shuffleWrapper}>
            <button className= {currentState.shuffleIcon} onClick={(event)=>handleShuffleClick(event)}>
            </button>
          </div>
          <div className="control-button-wrapper">
            <button className={currentState.skipBackIcon} onClick={(event)=>handleSkipBackClick(event)}></button>
          </div>
          <div className="control-button-wrapper">
            <button className={currentState.playIcon} onClick={(event)=>handlePlayClick(event)}></button>
          </div>
          <div className="control-button-wrapper">
            <button className={currentState.skipForwardIcon} onClick={(event)=> handleSkipForwardClick(event)}></button>
          </div>
          <div className= {currentState.repeatWrapper}>
            <button className={currentState.repeatIcon} onClick={(event)=> handleRepeatClick(event)}></button>
          </div>
        </div>
        <div className="play-bar">
          <div className="time-progress left-time">{currentState.currentSongTime}</div>
          <div className="progress-bar">
            <div className="progress-bar-wrapper">
              <input type="range" className="music-bar" min="0" max="100" value ={currentState.currentSongProgress}style={{background:currentState.musicBarProgress}}onChange={songRange}/>
            </div>
          </div>
          <div className="time-progress right-time">{currentState.songDuration}</div>
        </div>
      </div>
    </div>
  )
}

export default Center;
