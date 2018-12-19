import React, { Component } from 'react';
import './App.css';
import Square from './Square/Square'

class App extends Component {
  state = {
      // board: Array(18).fill(Array(10).fill('e')), DOESN'T WORK
      board: [
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
        ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ],
      currentPiece: [],
      currentPieceName: null,
      currentColor: null,
      gameBegun: false,
      stopped: false,
    }
    magicFunction = () =>{
      let boardCopy = this.state.board.slice()
      boardCopy[0][0] = 'y'
      this.setState({
        board: boardCopy
      }, ()=>console.log(this.state.board))
    }

  makeRow = (num) =>{
		return(
			<tr>
				<Square colorKey={this.state.board[num][0]}/>
				<Square colorKey={this.state.board[num][1]}/>	
				<Square colorKey={this.state.board[num][2]}/>
        <Square colorKey={this.state.board[num][3]}/>
				<Square colorKey={this.state.board[num][4]}/>	
				<Square colorKey={this.state.board[num][5]}/>
        <Square colorKey={this.state.board[num][6]}/>
				<Square colorKey={this.state.board[num][7]}/>	
				<Square colorKey={this.state.board[num][8]}/>
        <Square colorKey={this.state.board[num][9]}/>
			</tr>
				)		
	}
    keyRouter = (e) => {
      if (e.key === 'a') {
        // this.moveLeft();
      } else if (e.key === 'd') {
        // this.moveRight();
      } else if (e.key === 's') {
        // this.moveDown();
      } else if (e.key === 'w') {
        // this.rotate();
      }
    }

    start = () => {
      window.addEventListener('keypress', this.keyRouter)
      if (this.state.stopped) {
        this.setState({ stopped: false })
        this.gravity();
      }
        if (!this.state.gameBegun) {
          this.setState({gameBegun : true})
          this.getRandomPiece();
        }
    }

    stop = () => {
      window.removeEventListener('keypress', this.keyRouter)
      // console.log('stop')
      this.setState({ stopped: true })
      this.controlGravity('stop')
    }

    getRandomPiece = () => {
      console.log('get random piece')
      // const min = 0;
      // const max = 7;
      // const random = Math.floor(Math.random() * (max - min)) + min;

      const pieceArray = ['O', 'I', 'S', 'Z', 'L', 'J', 'T']
        // this.generatePiece(pieceArray[random])
        this.generatePiece(pieceArray[0])

    };

    generatePiece = (shapeName) => {
      console.log('generate Piece')
      
      this.setState({
        currentPieceName: shapeName,
        gameBegun: true,
        currentColor: 'y',
      }, ()=>console.log(this.state))
      
      // clearMs();
      // checkForFullRows();
      // checkForGameOver();
      
      let boardCopy = this.state.board.slice()
      if (shapeName === 'O') {
        boardCopy[0][4] = 'y';
        boardCopy[0][5] = 'y';
        boardCopy[1][4] = 'y';
        boardCopy[1][5] = 'y';
        
        this.setState({
          board: boardCopy,
          currentPiece: [[0, 4], [0, 5], [1, 4], [1, 5]]
        }, ()=>this.controlGravity('start'))
      }
    }

      // else if (shapeName === 'I') {
      //     currentColor = 'b'
      //     board[0][3] = 'bm'
      //     board[0][4] = 'bm'
      //     board[0][5] = 'bm'
      //     board[0][6] = 'bm'
      //     currentPiece = [[0, 3], [0, 4], [0, 5], [0, 6]]
      // }
      // else if (shapeName === 'S') {
      //     currentColor = 'r'
      //     board[0][4] = 'rm'
      //     board[0][5] = 'rm'
      //     board[1][5] = 'rm'
      //     board[1][6] = 'rm'
      //     currentPiece = [[0, 4], [0, 5], [1, 5], [1, 6]]
      // }
      // else if (shapeName === 'Z') {
      //     currentColor = 'g'
      //     board[0][3] = 'gm'
      //     board[0][4] = 'gm'
      //     board[1][4] = 'gm'
      //     board[1][5] = 'gm'
      //     currentPiece = [[0, 3], [0, 4], [1, 4], [1, 5]]

      // }
      // else if (shapeName === 'L') {
      //     currentColor = 'o'
      //     board[0][3] = 'om'
      //     board[0][4] = 'om'
      //     board[0][5] = 'om'
      //     board[1][5] = 'om'
      //     currentPiece = [[0, 3], [0, 4], [0, 5], [1, 5]]

      // }
      // else if (shapeName === 'J') {
      //     currentColor = 'p'
      //     board[0][3] = 'pm'
      //     board[0][4] = 'pm'
      //     board[0][5] = 'pm'
      //     board[1][3] = 'pm'
      //     currentPiece = [[0, 3], [0, 4], [0, 5], [1, 3]]

      // }
      // else if (shapeName === 'T') {
      //     currentColor = 'v'
      //     board[0][3] = 'vm'
      //     board[0][4] = 'vm'
      //     board[0][5] = 'vm'
      //     board[1][4] = 'vm'
      //     currentPiece = [[0, 3], [0, 4], [0, 5], [1, 4]]
      // }
    // };

    gravity = () => {
      console.log('gravity')
      // i.e., is the current piece allowed to descend, or is something in the way
      let allowed = true;

      // if (checkForFloor() || checkForBlocksBeneath()) {
      //     getRandomPiece();
      //     allowed = false;
      // }

      if (allowed) {
        let boardCopy = this.state.board.slice();
        let currentPieceCopy = this.state.currentPiece.slice();
          //mark all the spaces corresponding to the current piece to empty
          for (let i = 0; i < currentPieceCopy.length; i++) {
              boardCopy[currentPieceCopy[i][0]][currentPieceCopy[i][1]] = 'e'
          }
          //change all the spaces below current piece to the values of current piece
          for (let i = 0; i < currentPieceCopy.length; i++) {
              if (currentPieceCopy[i][0] + 1 < 18) {
                  boardCopy[currentPieceCopy[i][0] + 1][currentPieceCopy[i][1]] = this.state.currentColor 
                  // + 'm';
              }
          }
          //update the state of current piece
          for (let i = 0; i < currentPieceCopy.length; i++) {
              currentPieceCopy[i][0] = currentPieceCopy[i][0] + 1
          }
          this.setState({
            board : boardCopy,
            currentPiece : currentPieceCopy  
          })
      }
      // drawBoard();
      if (!this.state.stopped){
        this.controlGravity('start')
      }
    }

    controlGravity(command){
      let gravityTimeout;
      switch(command){
        case "start" : gravityTimeout = setTimeout(this.gravity, 1000); break;
        case "stop" : clearTimeout(gravityTimeout);
        break;
        default : console.log('ERR: called control gravity without command')
      }
    }
  

    
    render() {

      return (
        <div id="content">
          <div id="innerDiv">
            <h1>TETRIS</h1>

            <p>Control pieces with W, A, S and D.</p>
            <p>Regretably, pieces do not yet rotate.</p>
            <button onClick={this.start}>Start</button>
            <button onClick={this.magicFunction}>Render block thing</button>
            <table>
              <tbody>
                {this.makeRow(0)}
                {this.makeRow(1)}
                {this.makeRow(2)}
                {this.makeRow(3)}
                {this.makeRow(4)}
                {this.makeRow(5)}
                {this.makeRow(6)}
                {this.makeRow(7)}
                {this.makeRow(8)}
                {this.makeRow(9)}
                {this.makeRow(10)}
                {this.makeRow(11)}
                {this.makeRow(12)}
                {this.makeRow(13)}
                {this.makeRow(14)}
                {this.makeRow(15)}
                {this.makeRow(16)}
                {this.makeRow(17)}
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }




  export default App;
