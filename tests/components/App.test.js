import React from 'react'
import ReactDom from 'react-dom'
import {shallow, mount, render} from 'enzyme'
import renderer from 'react-test-renderer';

import App from '../../client/components/App.jsx';

describe('test',()=>{
  it('should exist',()=>{
    var type = typeof App
    expect(type).toBe('function')
  })

})
describe('Main App', () => {
  const wrapper = shallow(<App />);

  it('App renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
})