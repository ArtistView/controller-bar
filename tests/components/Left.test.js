import React from 'react'
import ReactDom from 'react-dom'
import {shallow, mount, render} from 'enzyme'

import Left from '../../client/components/Left.jsx';

describe('test',()=>{
  it('should exist',()=>{
    const wrapper = shallow(<Left />)

    expect((wrapper).find('.Left').exists()).toBe(true);
  })
})