import React from 'react';
import Logo from '../resource/logo.png'

export default function SelectOpponent(props) {
  const {changePlayWithFriendStatus} = props;
  return (
    <div className = 'playMode'>
      <img className = 'logoImage' src={Logo}/>
      <div className = 'gameHeadind2'>Choose Your play mode</div>
      <button
        className = 'basicButton withAIButton'
        type = 'button'
        onClick = {() => changePlayWithFriendStatus(false)}
      >With AI</button>
      <button
        className = 'basicButton'
        type = 'button'
        onClick = {() => changePlayWithFriendStatus(true)}
      >With Friend</button>
    </div>
  );
}
