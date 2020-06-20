import React from 'react';
import { lolosHeartEmpty } from 'react-icons/io'

const Left = function(props){
  return(
    <div className ='controller_left'>
      <div className = 'now-playing' role ='contentinfo' aria-label ="hi--place holder">
        <div className ="image-container">
          <div draggable='true'>
            <a className = "a-container" >
              <div className = "cover-art-container">
                <div className = "cover-art shadow">
                  <div>
                    <img src ="https://song-for-fake-spotify.s3-us-west-1.amazonaws.com/Obsidian.png" className = "cover-art-image"/>
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
                <a className = "song-text">Hello World</a>
              </span>
            </div>
          </div>
          <div className = "artist-name" dir= "auto">
            <span>
              <span className="artistname-wrapper">
                <span draggable="true">
                  <a className= "artist-text">Hack React</a>
                </span>
              </span>
            </span>
          </div>
        </div>
        <div className= "button-container">
          <button className="heart-button spoticon-heart-16 heart-button-active">
          </button>
        </div>
      </div>
    </div>
  )
}

export default Left