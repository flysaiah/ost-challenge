import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Player from './Player';
import YouTube from 'react-youtube';


configure({adapter: new Adapter()});

describe('<Player />', () => {

  it('should have "Load next video" button disabled if we\'re on last video', () => {
    const wrapper = shallow(<Player playerHidden={false}
      playlist={[{url: "test1?v=34", owner: "Jerry", canGuess: [], numGuesses: 3}, {url: "test1?v=34", owner: "Jerry", canGuess: [], numGuesses: 3}, {url: "test1?v=34", owner: "Jerry", canGuess: [], numGuesses: 3}]}
      currentPlaylistIndex={2}
      isAdmin={true}
      />);
    let found = false;
    for (let child of wrapper.props().children) {
      if (child && child.props.children === "Load Next Video") {
        found = true;
        expect(child.props.disabled).toBe(true);
      }
    }
    expect(found).toBe(true);
  });

  it('should be able to handle all kinds of valid Youtube URLS', () => {
    const urls = ["https://www.youtube.com/watch?v=Czrp5X4kIe0&list=PLGvwzkL07CIWKE_yCMuV1CQOQrWupU5Jn", "https://www.youtube.com/watch?v=Czrp5X4kIe0"]
    for (let url of urls) {
      let wrapper = shallow(<Player playerHidden={false}
        playlist={[{url: url, owner: "Jerry", canGuess: [], numGuesses: 3}]}
        currentPlaylistIndex={0}
        />);
      expect(wrapper.instance().badURL).toBe(false);
    }
  });

  it('should fail gracefully given bad URL input', () => {
    const urls = ["adsjfkdlsjaiop;'adsjj'"]
    for (let url of urls) {
      let wrapper = shallow(<Player playerHidden={false}
        playlist={[{url: url, owner: "Jerry", canGuess: [], numGuesses: 3}]}
        currentPlaylistIndex={0}
        />);
      expect(wrapper.instance().badURL).toBe(true);
    }
  });

  it('should be in player-hidden mode if playerHidden prop is true', () => {
    const wrapper = shallow(<Player playerHidden={false}
      playlist={[{url: "test1?v=34", owner: "Jerry", canGuess: [], numGuesses: 3}, {url: "test1?v=34", owner: "Jerry", canGuess: [], numGuesses: 3}, {url: "test1?v=34", owner: "Jerry", canGuess: [], numGuesses: 3}]}
      currentPlaylistIndex={2}
      />);
    for (let child of wrapper.props().children) {
      if (child && child.props.className === "player-container") {
        expect(child.props.children.props.className).toBe("player-hidden")
      }
    }
  });

});
