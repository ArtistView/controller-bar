import React from 'react'
import ReactDom from 'react-dom'
import {shallow, mount, render} from 'enzyme'

import Right from '../../client/components/Right.jsx';

describe('test',()=>{
  it('should exist',()=>{
    const wrapper = shallow(<Right />)

    expect((wrapper).find('.Right').exists()).toBe(true);
  })
})