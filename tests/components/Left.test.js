import React from 'react'
import ReactDom from 'react-dom'
import {shallow, mount, render} from 'enzyme'

import Left from '../../client/components/Left.jsx';

describe('test',()=>{
  it('should exist',()=>{
    var type = typeof Left
    expect(type).toBe('function')
  })

})