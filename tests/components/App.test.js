import React from 'react'
import ReactDom from 'react-dom'
import {shallow, mount} from 'enzyme'
//import App from '../client/components/App.jsx';
describe("Index",()=>{
  it('shole be true',()=>{
    const foo = true;
    expect(foo).toBe(true);
  })
  it('shole be false',()=>{
    const foo = false;
    expect(foo).toBe(false);
    //circle ci is added
  })
})