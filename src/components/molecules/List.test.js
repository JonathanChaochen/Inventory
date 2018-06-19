import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import List from './List';
import Button from '../atoms/Button';
import Item from '../atoms/Item';

configure({ adapter: new Adapter() });

describe('<List /> tests', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<List list={{ name: 'book' }} />);
  });

  it('should render one < <Button/>', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('should render one <Item/> ', () => {
    expect(wrapper.find(Item)).toHaveLength(1);
  });

  it('Item should render children p', () => {
    const item = wrapper.find('Item');
    expect(item.props()).toEqual({ children: <p>book</p> });
  });
});
