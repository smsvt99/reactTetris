import React from 'react';

const style = {
    color: 'white',
    opacity: '1'
  }
  const divStyle = {
    marginBlockStart: '10px',
    marginBlockEnd: '10px',
    backgroundColor: 'rgba(0,0,0,.8)',
    color: 'white',
    fontSize: '50px',
    width:'90%',
    height:'110%',
    textAlign: 'center',
    // margin: 'auto',
    position: 'absolute',
    top: '3%',
    left: '4.5%',
    border: '3px solid white',
    borderRadius: '20px',
    paddingTop: '5%'
  }

const GameOver = (props) =>{
    let message;
    if (props.gameOver && !props.showScores){
        message = <div style={divStyle}>
        <h1 style={style}>GAME OVER</h1>
        <h3>Final Score: {props.score}</h3>
        <h4>Enter Your name</h4>
        </div>

    } else {
        message = null
    }
    return message
}



export default GameOver;