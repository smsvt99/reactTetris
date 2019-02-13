import React from 'react'

const Display = (props) => {
    if (props.state.showScores){
        return null
    } else {
        return (
            <div id="content">
            <div id="innerDiv">
              <h1>TETRIS</h1> 
  
              <p>Control pieces with W, A, S and D.</p>
              <p>SCORE: <b>{props.state.score}</b> SPEED: 1 tick per <b>{props.state.gravitySpeed}</b> ms</p>
              <button onClick={props.start}>Start</button>
              <button onClick={props.stop}>Stop</button>
              <button onClick={props.endGame}>Scores</button>

              <table>
                <tbody>
                  {props.makeRow(0)}
                  {props.makeRow(1)}
                  {props.makeRow(2)}
                  {props.makeRow(3)}
                  {props.makeRow(4)}
                  {props.makeRow(5)}
                  {props.makeRow(6)}
                  {props.makeRow(7)}
                  {props.makeRow(8)}
                  {props.makeRow(9)}
                  {props.makeRow(10)}
                  {props.makeRow(11)}
                  {props.makeRow(12)}
                  {props.makeRow(13)}
                  {props.makeRow(14)}
                  {props.makeRow(15)}
                  {props.makeRow(16)}
                  {props.makeRow(17)}
                </tbody>
              </table>
            </div>
          </div>
        )
    }
}

export default Display;