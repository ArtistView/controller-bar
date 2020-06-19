import React from 'react';
import axios from 'axios';
import Right from './Right.jsx'
import Left from './Left.jsx'
import Center from './Center.jsx'

class App extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return (
      <div className= 'controller-components'>
        <Left/>
        <Center/>
        <Right/>
      </div>
    )
  }
}

export default App