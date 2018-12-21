import React from 'react';

const style = {
    backgroundColor: 'black',
    opacity: '.8',
    color: 'white',
    display: 'inline-block',
    position: 'absolute',
    top: '49%',
    fontSize: '60px',
    width: '99%',
    textAlign: 'center',
  }

const GameOver = (props) =>{
    let message;
    if (props.gameOver){
        message = <h1 style={style}>GAME OVER</h1>
    } else {
        message = null
    }
    return message
}



export default GameOver;