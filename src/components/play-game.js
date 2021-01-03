import React from 'react';
import {playSides} from '../constants/project-constants';
import {calculateWinner} from '../utils/utils';

function Square(props) {
  const { className, value, onClick} = props;
  return (
    value ?
      <img
        className={`square ${className}`}
        onClick={onClick}
        src = {value === 'X'? playSides.CROSS: playSides.CIRCLE}
      />:
      <div className={`square ${className}`} onClick={onClick}></div>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        className = {[1,4,7].indexOf(i) !== -1? 'leftRightBorder': ''}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className = 'board'>
        <div className='boardRow'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='boardRow'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='boardRow lastBoardRow'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


export default class PlayGame extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
    this.state = Object.assign({}, this.initialState);
    this.onPlayAgain = this.onPlayAgain.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onPlayAgain() {
    this.props.updateXWinnerCount(calculateWinner(this.state.squares) === 'X');
    this.setState({...this.initialState});
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const {xIsNext} = this.state;
    const {playWithFriend, youAreX} = this.props;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !xIsNext,
    });
    if(!playWithFriend) {
        this.setState((preState) => {
          const _squares = preState.squares.slice();
          if(!calculateWinner(_squares) && ((preState.xIsNext && !youAreX) || (!preState.xIsNext && youAreX))) {
            const indexOfNull = _squares.indexOf(null);
            _squares[indexOfNull] = preState.xIsNext ? 'X' : 'O';
            return {
              squares: _squares,
              xIsNext: !preState.xIsNext
            }
          }
        });
    }
  }

  render() {
    const {
      youAreX, playerXName, playerOName, playWithFriend, totalMatch, xWon
    } = this.props;
    const winner = calculateWinner(this.state.squares.slice());
    let status;
    if (winner) {
      status = `${winner === 'X'?
        typeof playerXName !== 'undefined'? playerXName: 'Side X':
        typeof playerOName !== 'undefined'? playerOName: 'Side O'} Win !!`
    }
    return (
      <div className = 'playGame'>
        <div className = 'gameStatus'>
          <div className = 'playerName'>{playerXName? playerXName: 'Side X'}</div>
          <div className = 'winStatus'>{xWon}-{totalMatch-xWon}</div>
          <div className = 'playerName'>{playerOName? playerOName: 'Side O'}</div>
        </div>
        <div className='gameBoard'>
          <Board
            squares={this.state.squares.slice()}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        {
          status?
          <div className = 'winnerStatus'>
            <div className = 'gameHeadind2'>{status}</div>
            <button className = 'basicButton' onClick = {this.onPlayAgain}>
              Play Again
            </button>
          </div>: null
        }
      </div>
    );
  }
}
