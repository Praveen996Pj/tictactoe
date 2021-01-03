import React from 'react';
import './App.css';
import SelectSide from './components/select-side';
import SelectOpponent from './components/select-opponent';
import PlayGame from './components/play-game';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playWithFriend: undefined,
      youAreX: undefined,
      playerXName: undefined,
      playerOName: undefined,
      totalMatch: 0,
      xWon: 0
    };
    this.changePlayWithFriendStatus = (playWithFriend) => this.setState({playWithFriend});
    this.changeYourAreXStatus = (youAreX) => this.setState({youAreX});
    this.changePlayerXName = (playerXName) => this.setState({playerXName});
    this.changePlayerOName = (playerOName) => this.setState({playerOName});
    this.updateXWinnerCount = (value) => {
      const updateStates = {totalMatch: this.state.totalMatch + 1};
      if(value) {
        updateStates.xWon = this.state.xWon + 1;
      }
      this.setState({...updateStates})
    }
  }
  render() {
    const {
      playWithFriend, youAreX, playerXName, playerOName, totalMatch, xWon
    } = this.state;
    if(typeof playWithFriend === 'undefined') {
      return <SelectOpponent
        changePlayWithFriendStatus = {this.changePlayWithFriendStatus}
      />
    }
    if(typeof youAreX === 'undefined') {
      return <SelectSide
        playWithFriend = {playWithFriend}
        changeYourAreXStatus = {this.changeYourAreXStatus}
        changePlayerOName = {this.changePlayerOName}
        changePlayerXName = {this.changePlayerXName}
        playerXName = {playerXName}
        playerOName = {playerOName}
      />
    }
    return (
      <PlayGame
        youAreX = {youAreX}
        playerXName = {playerXName}
        playerOName = {playerOName}
        playWithFriend = {playWithFriend}
        totalMatch = {totalMatch}
        xWon = {xWon}
        updateXWinnerCount = {this.updateXWinnerCount}
      />
    );
  }
}
