import React, {useState} from 'react';
import {playSides} from '../constants/project-constants';

export default function SelectOpponent(props) {
  const {changeYourAreXStatus} = props;
  const [selectSideX, changeSide] = useState(true);
  const {
    changePlayerOName, changePlayerXName,
    playerXName, playerOName, playWithFriend
  } = props;
  return (
    <div className = 'selectPlaySide'>
      <div className = 'gameHeadind2'>Pick your side</div>
      <div className = 'playSides'>
        <div className = 'playSide'>
          <img className = {`playSidesImg ${selectSideX? 'checkedImg': ''}`} src = {playSides.CROSS} />
          <input
            type = 'radio'
            className = 'radioInput'
            onChange = {() => changeSide(true)}
            checked = {selectSideX}
          />
          {
            playWithFriend || (!playWithFriend && selectSideX)?
            <input
              type = 'text'
              className = 'textField'
              placeholder = {'Enter Player Name'}
              onChange = {(event) => changePlayerXName(event.target.value)}
              value = {playerXName}
            /> : null
          }
        </div>
        <div className = 'playSide'>
          <img className = {`playSidesImg ${!selectSideX? 'checkedImg': ''}`} src = {playSides.CIRCLE} />
          <input
            type = 'radio'
            className = 'radioInput'
            onChange = {() => changeSide(false)}
            checked = {!selectSideX}
          />
          {
            playWithFriend || (!playWithFriend && !selectSideX)?
            <input
              type = 'text'
              className = 'textField'
              placeholder = {'Enter Player Name'}
              onChange = {(event) => changePlayerOName(event.target.value)}
              value = {playerOName}
            />: null
          }
        </div>
      </div>
      <button
        className = 'basicButton'
        onClick = {() => changeYourAreXStatus(selectSideX)}
      >Continue</button>
    </div>
  );
}
