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
      heartState: false
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
        <Center/>
        <Right/>
      </div>
    )
  }
}

export default App