import React from 'react'
import ReactDom from 'react-dom'
import {shallow, mount, render} from 'enzyme'

import Center from '../../client/components/Center.jsx';

describe('test',()=>{
  it('should exist',()=>{
    var type = typeof Center
    expect(type).toBe('function')
  })

})