import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Player from './Player';
import YouTube from 'react-youtube';


configure({adapter: new Adapter()});

describe('<Player />', () => {

  it('should have "Load next video" button disabled if we\'re on last video', () => {
    const wrapper = shallow(<Player playerHidden={false}
      playlist={["test1", "test2", "test3"]}
      currentVideoIndex={2}
      />);
      for (let child of wrapper.props().children) {
        if (child.props.children === "Load Next Video") {
          expect(child.props.disabled).toBe(true);
        }
      }
  });

  it('should be in player-hidden mode if playerHidden prop is true', () => {
    const wrapper = shallow(<Player playerHidden={true}
      playlist={["test1", "test2", "test3"]}
      currentVideoIndex={0}
      />);
      for (let child of wrapper.props().children) {
        if (child.props.className === "player-container") {
          expect(child.props.children.props.className).toBe("player-hidden")
        }
      }
  });

});
