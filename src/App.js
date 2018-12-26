import React, { Component } from 'react';
import './App.css';
import Square from './Square/Square';
import GameOver from './GameOver/GameOver';

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
    stopped: true,
    gameOver: false,
    score: 0,
    gravitySpeed: 500,
    rotation: 1
  }

  logBoard = () => {
    console.log(this.state.board)
  }

  makeRow = (num) => {
    return (
      <tr>
        <Square colorKey={this.state.board[num][0]} />
        <Square colorKey={this.state.board[num][1]} />
        <Square colorKey={this.state.board[num][2]} />
        <Square colorKey={this.state.board[num][3]} />
        <Square colorKey={this.state.board[num][4]} />
        <Square colorKey={this.state.board[num][5]} />
        <Square colorKey={this.state.board[num][6]} />
        <Square colorKey={this.state.board[num][7]} />
        <Square colorKey={this.state.board[num][8]} />
        <Square colorKey={this.state.board[num][9]} />
      </tr>
    )
  }
  keyRouter = (e) => {
    if (e.key === 'a') {
      this.moveLeft();
    } else if (e.key === 'd') {
      this.moveRight();
    } else if (e.key === 's') {
      this.moveDown();
    } else if (e.key === 'w') {
      this.rotate(this.state.rotation);
    }
  }

  start = () => {
    window.addEventListener('keypress', this.keyRouter)
    if (this.state.stopped) {
      this.setState({ stopped: false })
      this.controlGravity('start');
    }
    if (!this.state.gameBegun) {
      // this.setState({gameBegun : true})
      this.getRandomPiece();
    }
  }

  stop = () => {
    // window.removeEventListener('keypress', this.keyRouter)
    // console.log('stop')
    this.setState({ stopped: true })
    this.controlGravity('stop')
  }

  getRandomPiece = () => {
    console.log('get random piece')
    const min = 0;
    const max = 7;
    const random = Math.floor(Math.random() * (max - min)) + min;

    const pieceArray = ['O', 'I', 'S', 'Z', 'L', 'J', 'T']
    this.generatePiece(pieceArray[random])
    // this.generatePiece('T')

  };

  generatePiece = (shapeName) => {
    // console.log('generate Piece')

    this.setState({
      currentPieceName: shapeName,
      gameBegun: true,
      rotation: 1
    })

    this.clearMs();
    this.checkForFullRows();
    this.checkForGameOver();

    let boardCopy = this.state.board.map(row => row.slice());
    let currentPiece;
    let currentColor;

    if (shapeName === 'O') {
      currentColor = 'y';
      currentPiece = [[0, 4], [0, 5], [1, 4], [1, 5]]
    }
    else if (shapeName === 'I') {
      currentColor = 'b'
      currentPiece = [[0, 3], [0, 4], [0, 5], [0, 6]]
    }
    else if (shapeName === 'S') {
      currentColor = 'g'
      currentPiece = [[0, 4], [0, 5], [1, 3], [1, 4]]
    }
    else if (shapeName === 'Z') {
      currentColor = 'r'
      currentPiece = [[0, 3], [0, 4], [1, 4], [1, 5]]

    }
    else if (shapeName === 'J') {
      currentColor = 'o'
      currentPiece = [[1, 3], [1, 4], [1, 5], [0, 3]]

    }
    else if (shapeName === 'L') {
      currentColor = 'p'
      currentPiece = [[1, 3], [1, 4], [1, 5], [0, 5]]

    }
    else if (shapeName === 'T') {
      currentColor = 'v'
      currentPiece = [[1, 3], [1, 4], [1, 5], [0, 4]]
    }
    for (let i = 0; i < currentPiece.length; i++) {
      boardCopy[currentPiece[i][0]][currentPiece[i][1]] = currentColor + 'm'
    }
    this.setState({
      board: boardCopy,
      currentPiece: currentPiece,
      currentColor: currentColor
    }, () => {
      if (!this.state.gameBegun) {
        this.setState({ gameBegun: true }, () => {
          this.controlGravity('start')
        })
      }
    })
  };

  gravity = () => {
    // console.log('gravity')
    // i.e., is the current piece allowed to descend, or is something in the way
    let allowed = true;

    if (this.checkForFloor() || this.checkForBlocksBeneath()) {
      this.getRandomPiece();
      allowed = false;
    }

    if (allowed) {
      let boardCopy = this.state.board.map(row => row.slice());
      let currentPieceCopy = this.state.currentPiece.map(piece => piece.slice());
      //mark all the spaces corresponding to the current piece to empty
      for (let i = 0; i < currentPieceCopy.length; i++) {
        boardCopy[currentPieceCopy[i][0]][currentPieceCopy[i][1]] = 'e'
      }
      //change all the spaces below current piece to the values of current piece
      for (let i = 0; i < currentPieceCopy.length; i++) {
        if (currentPieceCopy[i][0] + 1 < 18) {
          boardCopy[currentPieceCopy[i][0] + 1][currentPieceCopy[i][1]] = this.state.currentColor + 'm';
        }
      }
      //update the state of current piece
      for (let i = 0; i < currentPieceCopy.length; i++) {
        currentPieceCopy[i][0] = currentPieceCopy[i][0] + 1
      }
      //merge these changes into state
      this.setState({
        board: boardCopy,
        currentPiece: currentPieceCopy
      })
    }
    if (!this.state.stopped) {
      this.controlGravity('start')
    }
  }

  controlGravity = (command) => {
    let gravityTimeout;
    switch (command) {
      case "start": gravityTimeout = setTimeout(this.gravity, this.state.gravitySpeed); break;
      case "stop": clearTimeout(gravityTimeout); break;
      default: console.log('ERR: called controlGravity without "stop" or "start"')
    }
  }

  checkForFloor = () => {
    // console.log('check for floor')
    for (let i = 0; i < this.state.currentPiece.length; i++) {
      if (!this.state.board[this.state.currentPiece[i][0] + 1]) {
        console.log('found floor')
        return true
      }
    }
  }
  checkForBlocksBeneath = () => {
    // console.log('check for blocks beneath')
    for (let i = 0; i < this.state.currentPiece.length; i++) {
      if (
        //there is a row below
        this.state.board[this.state.currentPiece[i][0] + 1]
        &&
        //the square below is not empty
        this.state.board[this.state.currentPiece[i][0] + 1][this.state.currentPiece[i][1]] !== 'e'
        &&
        // the square below is not part of the current piece
        this.state.board[this.state.currentPiece[i][0] + 1][this.state.currentPiece[i][1]] !== this.state.currentColor + 'm'
      ) {
        // !this.state.currentPiece.includes([this.state.currentPiece[i][0]+1, this.state.currentPiece[i][1]])
        // )
        // this.setState({stopped : true}, ()=>{
        // console.log(this.state)
        // console.log(this.state.board[this.state.currentPiece[i][0] + 1])
        // console.log(this.state.board[this.state.currentPiece[i][0] + 1][this.state.currentPiece[i][1]])
        // console.log(this.state.board[this.state.currentPiece[i][0] + 1][this.state.currentPiece[i][1]])
        return true
      }
    }
  }
  checkForBlocksRight = () => {
    for (let i = 0; i < this.state.currentPiece.length; i++) {
      if (
        this.state.board[this.state.currentPiece[i][0]][this.state.currentPiece[i][1] + 1] !== 'e'
        &&
        this.state.board[this.state.currentPiece[i][0]][this.state.currentPiece[i][1] + 1] !== this.state.currentColor + 'm') {
        return true
      }
    }
  }
  checkForBlocksLeft = () => {
    for (let i = 0; i < this.state.currentPiece.length; i++) {
      if (
        this.state.board[this.state.currentPiece[i][0]][this.state.currentPiece[i][1] - 1] !== 'e'
        &&
        this.state.board[this.state.currentPiece[i][0]][this.state.currentPiece[i][1] - 1] !== this.state.currentColor + 'm') {
        return true
      }
    }
  }



  clearMs = () => {
    console.log('clear ms')
    let boardCopy = this.state.board.map(row => row.slice());
    for (let i = 0; i <= 17; i++) {
      for (let j = 0; j <= 9; j++) {
        if (boardCopy[i][j].includes('m')) {
          boardCopy[i][j] = boardCopy[i][j].replace('m', '')
        }
      }
    }
    this.setState({
      board: boardCopy
    })
  }
  checkForGameOver = () => {
    console.log('check for game over')
    let topRow = this.state.board[0];
    for (let i = 0; i < topRow.length; i++) {
      if (!topRow[i].includes('e')) {
        if (!topRow[i].includes('m')) {
          this.stop();
          this.gameOver();
          return;
        }
      }
    }
  }

  gameOver = () => {
    console.log('gameOver')
    this.setState({ gameOver: true })
    this.stop();
  }
  moveLeft = () => {
    let allowed = true;
    let boardCopy = this.state.board.map(row => row.slice());
    let currentPieceCopy = this.state.currentPiece.map(piece => piece.slice());
    //If either the 'wall' or another piece is in the way
    for (let i = 0; i < currentPieceCopy.length; i++)
      if (!boardCopy[currentPieceCopy[i][0]][currentPieceCopy[i][1] - 1]
        ||
        this.checkForBlocksLeft()
      ) {
        allowed = false
      }
    if (allowed) {
      //empty out current position of current piece
      for (let i = 0; i < currentPieceCopy.length; i++) {
        boardCopy[currentPieceCopy[i][0]][currentPieceCopy[i][1]] = 'e'
      }
      //move those pieces left one place
      for (let i = 0; i < currentPieceCopy.length; i++) {
        boardCopy[currentPieceCopy[i][0]][currentPieceCopy[i][1] - 1] = this.state.currentColor + 'm'
      }
      //alter current piece to match new 
      for (let i = 0; i < currentPieceCopy.length; i++) {
        currentPieceCopy[i][1] = currentPieceCopy[i][1] - 1
      }
      this.setState({
        board: boardCopy,
        currentPiece: currentPieceCopy
      })
    }
  }
  moveRight = () => {
    let allowed = true;
    let boardCopy = this.state.board.map(row => row.slice());
    let currentPieceCopy = this.state.currentPiece.map(piece => piece.slice());

    for (let i = 0; i < currentPieceCopy.length; i++) {
      if (!boardCopy[currentPieceCopy[i][0]][currentPieceCopy[i][1] + 1]
        ||
        this.checkForBlocksRight()
      ) {
        allowed = false
      }
    }
    if (allowed) {
      for (let i = 0; i < currentPieceCopy.length; i++) {
        boardCopy[currentPieceCopy[i][0]][currentPieceCopy[i][1]] = 'e'
      }
      for (let i = 0; i < currentPieceCopy.length; i++) {
        boardCopy[currentPieceCopy[i][0]][currentPieceCopy[i][1] + 1] = this.state.currentColor + 'm'
      }
      for (let i = 0; i < currentPieceCopy.length; i++) {
        currentPieceCopy[i][1] = currentPieceCopy[i][1] + 1
      }
    }
    this.setState({
      board: boardCopy,
      currentPiece: currentPieceCopy
    })

  }

  moveDown = () => {
    let allowed = true;
    let boardCopy = this.state.board.map(row => row.slice());
    let currentPieceCopy = this.state.currentPiece.map(piece => piece.slice());

    for (let i = 0; i < currentPieceCopy.length; i++)
      if (!boardCopy[currentPieceCopy[i][0] + 1]
        ||
        this.checkForBlocksBeneath()
      ) {
        allowed = false
      }
    if (allowed) {
      for (let i = 0; i < currentPieceCopy.length; i++) {
        boardCopy[currentPieceCopy[i][0]][currentPieceCopy[i][1]] = 'e'
      }
      for (let i = 0; i < currentPieceCopy.length; i++) {
        boardCopy[currentPieceCopy[i][0] + 1][currentPieceCopy[i][1]] = this.state.currentColor + 'm'
      }
      for (let i = 0; i < currentPieceCopy.length; i++) {
        currentPieceCopy[i][0] = currentPieceCopy[i][0] + 1
      }
    }
    this.setState({
      board: boardCopy,
      currentPiece: currentPieceCopy
    })
  }

  rotate = (rotation) => {
    console.log('rotate')
    // let currentPieceCopy = this.state.currentPiece.slice()
    // let boardCopy = this.state.board.slice()
    let boardCopy = this.state.board.map(row => row.slice());
    let currentPieceCopy = this.state.currentPiece.map(piece => piece.slice());
    let rotationCopy;

    if (this.state.currentPieceName === 'O') {
      //this piece does not rotate
    } else if (this.state.currentPieceName === 'I') {
      switch (rotation) {
        case 1: (function () {
          rotationCopy = 2;
          currentPieceCopy[0][0] += -1;
          currentPieceCopy[0][1] += 1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += 1;
          currentPieceCopy[2][1] += -1;
          currentPieceCopy[3][0] += 2;
          currentPieceCopy[3][1] += -2;
        })();
          break;
        case 2: (() => {
          rotationCopy = 3;
          currentPieceCopy[0][0] += 1;
          currentPieceCopy[0][1] += 1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += -1;
          currentPieceCopy[2][1] += -1;
          currentPieceCopy[3][0] += -2;
          currentPieceCopy[3][1] += -2;
        })();
          break;
        case 3: (() => {
          rotationCopy = 4;
          currentPieceCopy[0][0] += 1;
          currentPieceCopy[0][1] += -1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += -1;
          currentPieceCopy[2][1] += 1;
          currentPieceCopy[3][0] += -2;
          currentPieceCopy[3][1] += 2;
        })();
          break;
        case 4: (() => {
          rotationCopy = 1;
          currentPieceCopy[0][0] += -1;
          currentPieceCopy[0][1] += -1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += 1;
          currentPieceCopy[2][1] += 1;
          currentPieceCopy[3][0] += 2;
          currentPieceCopy[3][1] += 2;
        })();
          break;
        default: console.log('there was a big problem');
      }
    } else if (this.state.currentPieceName === 'S') {
      switch (rotation) {
        case 1: (function () {
          rotationCopy = 2;
          currentPieceCopy[0][0] += 1;
          currentPieceCopy[0][1] += 1;
          currentPieceCopy[1][0] += 2;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += -1;
          currentPieceCopy[2][1] += 1;
          currentPieceCopy[3][0] += 0;
          currentPieceCopy[3][1] += 0;
        })();
          break;
        case 2: (() => {
          rotationCopy = 3;
          currentPieceCopy[0][0] += 1;
          currentPieceCopy[0][1] += -1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += -2;
          currentPieceCopy[2][0] += 1;
          currentPieceCopy[2][1] += 1;
          currentPieceCopy[3][0] += 0;
          currentPieceCopy[3][1] += 0;
        })();
          break;
        case 3: (() => {
          rotationCopy = 4;
          currentPieceCopy[0][0] += -1;
          currentPieceCopy[0][1] += -1;
          currentPieceCopy[1][0] += -2;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += 1;
          currentPieceCopy[2][1] += -1;
          currentPieceCopy[3][0] += 0;
          currentPieceCopy[3][1] += 0;
        })();
          break;
        case 4: (() => {
          rotationCopy = 1;
          currentPieceCopy[0][0] += -1;
          currentPieceCopy[0][1] += 1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 2;
          currentPieceCopy[2][0] += -1;
          currentPieceCopy[2][1] += -1;
          currentPieceCopy[3][0] += 0;
          currentPieceCopy[3][1] += 0;
        })();
      }
    } else if (this.state.currentPieceName === 'Z') {
      switch (rotation) {
        case 1: (function () {
          rotationCopy = 2;
          currentPieceCopy[0][0] += 0;
          currentPieceCopy[0][1] += 2;
          currentPieceCopy[1][0] += 1;
          currentPieceCopy[1][1] += 1;
          currentPieceCopy[2][0] += 0;
          currentPieceCopy[2][1] += 0;
          currentPieceCopy[3][0] += 1;
          currentPieceCopy[3][1] += -1;
        })();
          break;
        case 2: (() => {
          rotationCopy = 3;
          currentPieceCopy[0][0] += 2;
          currentPieceCopy[0][1] += 0;
          currentPieceCopy[1][0] += 1;
          currentPieceCopy[1][1] += -1;
          currentPieceCopy[2][0] += 0;
          currentPieceCopy[2][1] += 0;
          currentPieceCopy[3][0] += -1;
          currentPieceCopy[3][1] += -1;
        })();
          break;
        case 3: (() => {
          rotationCopy = 4;
          currentPieceCopy[0][0] += 0;
          currentPieceCopy[0][1] += -2;
          currentPieceCopy[1][0] += -1;
          currentPieceCopy[1][1] += -1;
          currentPieceCopy[2][0] += 0;
          currentPieceCopy[2][1] += 0;
          currentPieceCopy[3][0] += -1;
          currentPieceCopy[3][1] += 1;
        })();
          break;
        case 4: (() => {
          rotationCopy = 1;
          currentPieceCopy[0][0] += -2;
          currentPieceCopy[0][1] += 0;
          currentPieceCopy[1][0] += -1;
          currentPieceCopy[1][1] += 1;
          currentPieceCopy[2][0] += 0;
          currentPieceCopy[2][1] += 0;
          currentPieceCopy[3][0] += 1;
          currentPieceCopy[3][1] += 1;
        })();
      }
    } else if (this.state.currentPieceName === 'L') {
      switch (rotation) {
        case 1: (function () {
          rotationCopy = 2;
          currentPieceCopy[0][0] += -1;
          currentPieceCopy[0][1] += 1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += 1;
          currentPieceCopy[2][1] += -1;
          currentPieceCopy[3][0] += 2;
          currentPieceCopy[3][1] += 0;
        })();
          break;
        case 2: (() => {
          rotationCopy = 3;
          currentPieceCopy[0][0] += 1;
          currentPieceCopy[0][1] += 1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += -1;
          currentPieceCopy[2][1] += -1;
          currentPieceCopy[3][0] += 0;
          currentPieceCopy[3][1] += -2;
        })();
          break;
        case 3: (() => {
          rotationCopy = 4;
          currentPieceCopy[0][0] += 1;
          currentPieceCopy[0][1] += -1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += -1;
          currentPieceCopy[2][1] += 1;
          currentPieceCopy[3][0] += -2;
          currentPieceCopy[3][1] += 0;
        })();
          break;
        case 4: (() => {
          rotationCopy = 1;
          currentPieceCopy[0][0] += -1;
          currentPieceCopy[0][1] += -1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += 1;
          currentPieceCopy[2][1] += 1;
          currentPieceCopy[3][0] += 0;
          currentPieceCopy[3][1] += 2;
        })();
      }
    } else if (this.state.currentPieceName === 'J') {
      switch (rotation) {
        case 1: (function () {
          rotationCopy = 2;
          currentPieceCopy[0][0] += -1;
          currentPieceCopy[0][1] += 1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += 1;
          currentPieceCopy[2][1] += -1;
          currentPieceCopy[3][0] += 0;
          currentPieceCopy[3][1] += 2;
        })();
          break;
        case 2: (() => {
          rotationCopy = 3;
          currentPieceCopy[0][0] += 1;
          currentPieceCopy[0][1] += 1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += -1;
          currentPieceCopy[2][1] += -1;
          currentPieceCopy[3][0] += 2;
          currentPieceCopy[3][1] += 0;
        })();
          break;
        case 3: (() => {
          rotationCopy = 4;
          currentPieceCopy[0][0] += 1;
          currentPieceCopy[0][1] += -1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += -1;
          currentPieceCopy[2][1] += 1;
          currentPieceCopy[3][0] += 0;
          currentPieceCopy[3][1] += -2;
        })();
          break;
        case 4: (() => {
          rotationCopy = 1;
          currentPieceCopy[0][0] += -1;
          currentPieceCopy[0][1] += -1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += 1;
          currentPieceCopy[2][1] += 1;
          currentPieceCopy[3][0] += -2;
          currentPieceCopy[3][1] += 0;
        })();
      }

    } else if (this.state.currentPieceName === 'T') {
      switch (rotation) {
        case 1: (function () {
          rotationCopy = 2;
          currentPieceCopy[0][0] += -1;
          currentPieceCopy[0][1] += 1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += 1;
          currentPieceCopy[2][1] += -1;
          currentPieceCopy[3][0] += 1;
          currentPieceCopy[3][1] += 1;
        })();
          break;
        case 2: (() => {
          rotationCopy = 3;
          currentPieceCopy[0][0] += 1;
          currentPieceCopy[0][1] += 1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += -1;
          currentPieceCopy[2][1] += -1;
          currentPieceCopy[3][0] += 1;
          currentPieceCopy[3][1] += -1;
        })();
          break;
        case 3: (() => {
          rotationCopy = 4;
          currentPieceCopy[0][0] += 1;
          currentPieceCopy[0][1] += -1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += -1;
          currentPieceCopy[2][1] += 1;
          currentPieceCopy[3][0] += -1;
          currentPieceCopy[3][1] += -1;
        })();
          break;
        case 4: (() => {
          rotationCopy = 1;
          currentPieceCopy[0][0] += -1;
          currentPieceCopy[0][1] += -1;
          currentPieceCopy[1][0] += 0;
          currentPieceCopy[1][1] += 0;
          currentPieceCopy[2][0] += 1;
          currentPieceCopy[2][1] += 1;
          currentPieceCopy[3][0] += -1;
          currentPieceCopy[3][1] += 1;
        })();
      }
    }


    if (this.rotationAllowed(currentPieceCopy)) {
      console.log(this.state.currentPiece)
      for (let i = 0; i < this.state.currentPiece.length; i++) {
        console.log('did loop')
        boardCopy[this.state.currentPiece[i][0]][this.state.currentPiece[i][1]] = 'e'
      }
      for (let i = 0; i < currentPieceCopy.length; i++) {
        boardCopy[currentPieceCopy[i][0]][currentPieceCopy[i][1]] = this.state.currentColor + 'm'
      }
      this.setState({
        board: boardCopy,
        currentPiece: currentPieceCopy,
        rotation: rotationCopy
      })

    }
  }

  rotationAllowed = (hypotheticalPiece) => {
    let wontHitWalls = true;
    let wontHitBlocks = true;

    for (let i = 0; i < hypotheticalPiece.length; i++) {
      // if (hypotheticalPiece[i][0] < 0) {
      //   wontHitWalls = false
      // } if (hypotheticalPiece[i][0] > 17) {
      //   wontHitWalls = false
      // } if (hypotheticalPiece[i][1] < 0) {
      //   wontHitWalls = false
      // } if (hypotheticalPiece[i][1] > 9) {
      //   wontHitWalls = false
      // }
      if (!this.state.board[hypotheticalPiece[i][0]][hypotheticalPiece[i][1]]){
        wontHitWalls = false;
      }
    }

    for (let i = 0; i < hypotheticalPiece.length; i++) {
      if (this.state.board[hypotheticalPiece[i][0]][[hypotheticalPiece[i][1]]] !== 'e') {
        if (this.state.board[hypotheticalPiece[i][0]][[hypotheticalPiece[i][1]]] !== this.state.currentColor + 'm') {
          wontHitBlocks = false;
        }
      }
    }
    console.log('walls', wontHitWalls)
    console.log('blocks', wontHitBlocks)
    return (wontHitWalls && wontHitBlocks)
  }

  checkForFullRows = () => {
    let fullRowArray = [];
    for (let i = 0; i < this.state.board.length; i++) {
      if (!this.state.board[i].includes('e')) {
        fullRowArray.push(i)
      }
    }
    if (fullRowArray.length > 0) {
      this.setState({
        score : this.state.score + fullRowArray.length,
        gravitySpeed : this.state.gravitySpeed - (fullRowArray.length * 3)
      })
      this.colorFullRow(fullRowArray)
      console.log(fullRowArray)
    }
  }
  colorFullRow = (array) => {
    let boardCopy = this.state.board.map(row => row.slice());
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < 10; j++) {
            boardCopy[array[i]][j] = 'e'
        }
    }
    this.setState({board: boardCopy})
    setTimeout(()=>{
      this.shiftBlocksDown(array);
    },500)
}
shiftBlocksDown = (array) => {
  let boardCopy = this.state.board.map(row => row.slice());
  //begginning with the row above the lowest full row, shift the values of each row down one. If there are multiple full rows, repeat.
  // let layer = 0;
  for (let i = 0; i < array.length; i++) {
      for (let j = array[i]; j > -1; j--) {
          if (j === 0) {
              boardCopy[j] = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
          } else {
              boardCopy[j] = boardCopy[j - 1]
          }
      }
  }
  this.setState({board: boardCopy})
}

  render() {

    return (
      <div>
        <GameOver id="gameOver" gameOver={this.state.gameOver} />
        <div id="content">
          <div id="innerDiv">
            <h1>TETRIS</h1>

            <p>Control pieces with W, A, S and D.</p>
            <p>SCORE: {this.state.score} SPEED: {this.state.gravitySpeed} ms</p>
            <button onClick={this.start}>Start</button>
            <button onClick={this.stop}>Stop</button>
            <button onClick={this.logBoard}>Log Board</button>
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
      </div>
    )
  }
}




export default App;
