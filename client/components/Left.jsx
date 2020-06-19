import React from 'react';

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
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Left