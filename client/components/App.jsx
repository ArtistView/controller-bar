import React from 'react';
import axios from 'axios';

class App extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return (
      <div classname= 'contoller-components'>
        <div>Left</div>
        <div>Center</div>
        <div>Right</div>
      </div>
    )
  }
}

export default App