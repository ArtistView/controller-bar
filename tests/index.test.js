import React from 'react'
import {shallow, mount} from 'enzyme'
//import index from '../client/index.jsx';


describe("Index",()=>{
  it('shole be true',()=>{
    const foo = true;
    expect(foo).toBe(true);
  })
  it('shole be false',()=>{
    const foo = false;
    expect(foo).toBe(false);
  })
})
