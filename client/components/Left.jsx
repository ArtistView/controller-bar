import React from 'react';
import { FaBeer } from 'react-icons/fa'

const Left = function({currentState,handleHeartClick,handleWindowClick}){
  return(
    <div className ='controller_left'>
      <div className = 'now-playing' role ='contentinfo' aria-label ="hi--place holder">
        <div className ="image-container">
          <div draggable='true'>
            <a className = "a-container" >
              <div className = "cover-art-container">
                <div className = "cover-art shadow">
                  <div>
                    <img src ={currentState.coverArt}className = "cover-art-image"/>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div></div>
        </div>
        <div className = "song-title-container">
          <div className ="song-title" dir = 'auto'>
            <div className ="menu-wrapper">
              <span draggable="true">
                  <a className = "song-text">{currentState.songTitle}</a>
              </span>
            </div>
          </div>
          <div className = "artist-name" dir= "auto">
            <span>
              <span className="artistname-wrapper">
                <span draggable="true">
                  <a className= "artist-text">{currentState.albumTitle}</a>
                </span>
              </span>
            </span>
          </div>
        </div>
        <div className= "button-container">
          <button className={currentState.heart} onClick={(event)=> handleHeartClick(event)}>
          </button>
        </div>
        <div className="window-player">
          <button className={currentState.window} onClick={(event)=>handleWindowClick(event)}></button>
        </div>
      </div>
    </div>
  )
}

export default Left