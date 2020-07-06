import React from 'react'
import ReactDom from 'react-dom'
import {shallow, mount, render} from 'enzyme'

import Center from '../../client/components/Center.jsx';

describe('test',()=>{
  it('should exist',()=>{
    const wrapper = shallow(<Center />)

    expect((wrapper).find('.Center').exists()).toBe(true);
  })
})