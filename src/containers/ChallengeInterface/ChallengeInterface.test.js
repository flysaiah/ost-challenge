import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChallengeInterface from './ChallengeInterface';

configure({adapter: new Adapter()});

describe('<ChallengeInterface />', () => {

  it('should update playlist correctly on addTrack', () => {
    let wrapper = shallow(<ChallengeInterface/>);
    wrapper = wrapper.setState({
      playlist: ["https://www.youtube.com/watch?v=MvHK2OWkCFg",
                "https://www.youtube.com/watch?v=CwXXsSg4p-s"],
      currentVideoIndex: 0,
      playerHidden: false,
      numGuesses: 3,
      newTrackURL: "https://www.youtube.com/watch?v=gBOwbkzEUu8"
    });
    const child = wrapper.childAt(1).childAt(0);
    child.props().handleButtonClick();
    expect(wrapper.state().playlist).toHaveLength(3);
  });

});
