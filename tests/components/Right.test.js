import React from 'react'
import ReactDom from 'react-dom'
import {shallow, mount, render} from 'enzyme'

import Right from '../../client/components/Right.jsx';

describe('test',()=>{
  it('should exist',()=>{
    var type = typeof Right
    expect(type).toBe('function')
  })

})