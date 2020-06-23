import React from 'react';
import axios from 'axios';
import Right from './Right.jsx'
import Left from './Left.jsx'
import Center from './Center.jsx'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      songTitle:"Hello World",
      albumTitle: "Hack Reactor",
      coverArt:"https://song-for-fake-spotify.s3-us-west-1.amazonaws.com/Obsidian.png",
      heart: "heart-button icon-heart",
      heartState: false,
      shuffleState: false,
      shuffleWrapper:"control-button-wrapper",
      shuffleIcon: "control-button shuffle-icon",
      skipBackState: false,
      skipBackIcon: "control-button skip-back-icon",
      playState: false,
      pauseState:true,
      playIcon: "control-button play-icon play-button-circle",
      skipForwardState:false,
      skipForwardIcon: "control-button skip-forward-icon",
      repeatState:false,
      repeatOnce: false,
      repeatIcon:"control-button repeat-icon",
      queueState:false,
      queueWrapper:'control-button-wrapper',
      queueIcon:"control-button queue-icon",
      deviceState:false,
      volumeState:false,
      volumeIcon:"control-button speaker-icon",
      volumeRight:{transform:'translateX(0%)'},
      volumeLeft:{left:'100%'},
    }
  }
  handleVolumeClick(event){
    event.preventDefault();
    if(this.state.volumeState===false){
      this.setState({
        volumeState:true,
        volumeIcon:"control-button speaker-mute-icon",
        volumeRight:{transform:'translateX(-100%)'},
        volumeLeft:{left:'0%'},
      })
    }
    if(this.state.volumeState===true){
      this.setState({
        volumeState:false,
        volumeIcon:"control-button speaker-icon",
        volumeRight:{transform:'translateX(0%)'},
        volumeLeft:{left:'100%'},
      })
    }
  }
  handleDeviceClick(event){
    event.preventDefault();
    if(this.state.deviceState===false){
      this.setState({
        deviceState:true,
      })
    }
    if(this.state.deviceState===true){
      this.setState({
        deviceState:false,
      })
    }

  }

  handleQueueClick(event){
    event.preventDefault()
    if(this.state.queueState===false){
      this.setState({
        queueState: true,
        queueWrapper:"control-button-wrapper control-button--active-dot",
        queueIcon:"control-button queue-icon control-button--active",
      })
    }
    if(this.state.queueState===true){
      this.setState({
        queueState:false,
        queueWrapper:'control-button-wrapper',
        queueIcon:"control-button queue-icon",
      })
    }
  }

  handleRepeatClick(event){
    event.preventDefault();

    if(this.state.repeatState===false && this.state.repeatOnce===false){
      this.setState({
        repeatState:true,
        repeatOnce: true,
        repeatWrapper:"control-button-wrapper control-button--active-dot",
        repeatIcon:"control-button repeat-icon control-button--active",
      })
    }
    if(this.state.repeatState===true && this.state.repeatOnce ===true){
      this.setState({
        repeatState:false,
        repeatOnce: true,
        repeatWrapper:"control-button-wrapper control-button--active-dot",
        repeatIcon:"control-button repeat-icon-twice control-button--active",
      })
    }

    if(this.state.repeatState===false && this.state.repeatOnce===true){
      this.setState({
        repeatState:false,
        repeatOnce:false,
        repeatWrapper:"control-button-wrapper",
        repeatIcon:"control-button repeat-icon",
      })
    }
  }


  handleSkipForwardClick(event){
    event.preventDefault();
    if(this.state.skipForwardState===false){
      this.setState({
        skipForwardState:true,
        skipForwardIcon:"control-button skip-forward-icon control-media-button-active",
        playState: true,
        pauseState:false,
        playIcon: "control-button pause-icon play-button-circle",
        skipBackState:false,
        skipBackIcon:"control-button skip-back-icon",
      })
    }
    // if(this.state.skipForwardState===true){
    //   this.setState({
    //     skipForwardState:false,
    //     skipForwardIcon:"control-button skip-forward-icon",
    //   })
    // }

  }
  handlePlayClick(event){
    event.preventDefault();
    if(this.state.playState === false && this.state.pauseState === true){
      this.setState({
        playState:true,
        playIcon:"control-button pause-icon play-button-circle-active control-media-button-active",
        pauseState: false,
        skipBackState:false,
        skipBackIcon:"control-button skip-back-icon",
        skipForwardState:false,
        skipForwardIcon:"control-button skip-forward-icon",
      })
    }
    if(this.state.playState=== true && this.state.pauseState === false){
      this.setState({
        playState: false,
        pauseState: true,
        playIcon: "control-button play-icon play-button-circle",
        skipBackState:false,
        skipBackIcon:"control-button skip-back-icon",
        skipForwardState:false,
        skipForwardIcon:"control-button skip-forward-icon",
      })
    }
  }

  handleSkipBackClick(event){
    event.preventDefault()

    if(this.state.skipBackState === false){
      this.setState({
        skipBackState:true,
        skipBackIcon:"control-button skip-back-icon control-media-button-active",
        playState: true,
        pauseState:false,
        playIcon: "control-button pause-icon play-button-circle",
        skipForwardState:false,
        skipForwardIcon:"control-button skip-forward-icon",
      })
    }
    // if(this.state.skipBackState===true){
    //   this.setState({
    //     skipBackState:false,
    //     skipBackIcon:"control-button skip-back-icon",
    //   })
    // }

  }


  handleShuffleClick(event){
    event.preventDefault();

    if(this.state.shuffleState === false){
      this.setState({
        shuffleState:true,
        shuffleWrapper: "control-button-wrapper control-button--active-dot",
        shuffleIcon:"control-button shuffle-icon control-button--active",
      })
    }
    if(this.state.shuffleState === true){
      this.setState({
        shuffleState:false,
        shuffleWrapper: "control-button-wrapper",
        shuffleIcon:"control-button shuffle-icon",
      })
    }

  }


  handleHeartClick(event){

    event.preventDefault();

    if(this.state.heartState === false){
    this.setState({
      heart:'heart-button-active icon-heart-active',
      heartState:true,
      })
    }

    if(this.state.heartState === true){
      this.setState({
        heart:'heart-button icon-heart',
        heartState: false,
      })
    }

  }


  render(){
    return (
      <div className= 'controller-components'>
        <Left currentState= {this.state} handleHeartClick={this.handleHeartClick.bind(this)}/>
        <Center currentState={this.state} handleShuffleClick={this.handleShuffleClick.bind(this)} handleSkipBackClick= {this.handleSkipBackClick.bind(this)} handlePlayClick={this.handlePlayClick.bind(this)} handleSkipForwardClick={this.handleSkipForwardClick.bind(this)} handleRepeatClick={this.handleRepeatClick.bind(this)}/>
        <Right currentState={this.state} handleQueueClick={this.handleQueueClick.bind(this)} handleDeviceClick={this.handleDeviceClick.bind(this)} handleVolumeClick={this.handleVolumeClick.bind(this)}/>
      </div>
    )
  }
}

export default App