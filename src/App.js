import React, { Component } from 'react';
import './App.css';
import Square from './Square/Square';
import GameOver from './GameOver/GameOver';
import Form from './Form/Form';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import Display from './Display/Display';


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
    showScores: false,
    score: 0,
    gravitySpeed: 400,
    rotation: 1,
    name: '',
    savedStates : [],
    previousBoards: [],
    timeWarpIndex: 0
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
    window.removeEventListener('keypress', this.keyRouter)
    this.setState({ stopped: true })
    this.controlGravity('stop')
  }

  getRandomPiece = () => {
    const min = 0;
    const max = 7;
    const random = Math.floor(Math.random() * (max - min)) + min;

    const pieceArray = ['O', 'I', 'S', 'Z', 'L', 'J', 'T']
    this.generatePiece(pieceArray[random])
    // this.generatePiece('I')
  };

  generatePiece = (shapeName) => {

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
      previousBoards : this.trackBoard(boardCopy),
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
        previousBoards : this.trackBoard(boardCopy),
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
    for (let i = 0; i < this.state.currentPiece.length; i++) {
      if (!this.state.board[this.state.currentPiece[i][0] + 1]) {
        return true
      }
    }
  }
  checkForBlocksBeneath = () => {
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
    let boardCopy = this.state.board.map(row => row.slice());
    for (let i = 0; i <= 17; i++) {
      for (let j = 0; j <= 9; j++) {
        if (boardCopy[i][j].includes('m')) {
          boardCopy[i][j] = boardCopy[i][j].replace('m', '')
        }
      }
    }
    this.setState({
      previousBoards : this.trackBoard(boardCopy),
      board: boardCopy
    })
  }
  checkForGameOver = () => {
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
    this.setState({ 
      gameOver: true, 
    })
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
        previousBoards : this.trackBoard(boardCopy),
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
      previousBoards : this.trackBoard(boardCopy),
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
      previousBoards : this.trackBoard(boardCopy),
      board: boardCopy,
      currentPiece: currentPieceCopy
    })
  }

  rotate = (rotation) => {
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
          break;
        default: console.log('there was a big problem');
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
          break;
        default: console.log('there was a big problem');
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
          break;
        default: console.log('there was a big problem');
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
          break;
        default: console.log('there was a big problem');
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
          break;
        default: console.log('there was a big problem');
      }
    }


    if (this.rotationAllowed(currentPieceCopy)) {
      for (let i = 0; i < this.state.currentPiece.length; i++) {
        boardCopy[this.state.currentPiece[i][0]][this.state.currentPiece[i][1]] = 'e'
      }
      for (let i = 0; i < currentPieceCopy.length; i++) {
        boardCopy[currentPieceCopy[i][0]][currentPieceCopy[i][1]] = this.state.currentColor + 'm'
      }
      this.setState({
        previousBoards : this.trackBoard(boardCopy),
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
      if (hypotheticalPiece[i][0] < 0) {
        wontHitWalls = false
      } if (hypotheticalPiece[i][0] > 17) {
        wontHitWalls = false
      } if (hypotheticalPiece[i][1] < 0) {
        wontHitWalls = false
      } if (hypotheticalPiece[i][1] > 9) {
        wontHitWalls = false
      }
    }

    //this is an (inelegant) fix; will fail otherwise.
    if (!wontHitWalls) {
      return false
    }

    for (let i = 0; i < hypotheticalPiece.length; i++) {
      if (this.state.board[hypotheticalPiece[i][0]][[hypotheticalPiece[i][1]]] !== 'e') {
        if (this.state.board[hypotheticalPiece[i][0]][[hypotheticalPiece[i][1]]] !== this.state.currentColor + 'm') {
          wontHitBlocks = false;
        }
      }
    }
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
        score: this.state.score + (fullRowArray.length * fullRowArray.length),
        gravitySpeed: this.state.gravitySpeed - (fullRowArray.length * 10)
      })
      this.colorFullRow(fullRowArray)
    }
  }
  colorFullRow = (array) => {
    let boardCopy = this.state.board.map(row => row.slice());
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < 10; j++) {
        boardCopy[array[i]][j] = 'e'
      }
    }
    this.setState({ 
      previousBoards : this.trackBoard(boardCopy),
      board: boardCopy 
    })
    setTimeout(() => {
      this.shiftBlocksDown(array);
    }, 400)
  }
  shiftBlocksDown = (array) => {
    let boardCopy = this.state.board.map(row => row.slice());
    // array is an array of in indices of full rows.
    //begginning with the row above the lowest full row, shift the values of each row down one. If there are multiple full rows, repeat.
    for (let i = 0; i < array.length; i++) {
      for (let j = array[i]; j > -1; j--) {
        if (j === 0) {
          boardCopy[j] = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
        } else {
          // old: boardCopy[j] = boardCopy[j - 1]
          for (let k = 0; k < 10; k++) {
            if (!boardCopy[j - 1][k].includes('m') && !boardCopy[j][k].includes('m')) {
              boardCopy[j][k] = boardCopy[j - 1][k]
            }
          }
        }
      }
    }
    this.setState({
      previousBoards : this.trackBoard(boardCopy), 
      board: boardCopy 
    })
  }
  submitCheck = ()=>{
    fetch('/states', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {return response.json()})
    .then((json) => {this.setState({savedStates : json})})
    .then(() => {
        if (this.isHighestScore()){
          this.submit();
        } else if (this.isHighScore()){
          this.trimAndSubmit();
        } else {
          this.scoreState();
          this.controlTimeWarp('start');
      }
    })
  }
    isHighestScore = () =>{
      if (this.state.score >= this.state.savedStates[0].score){
        return true;
      } else {
        return false;
      }
    }
    isHighScore = () =>{
      let highScore = false;
      for (let i = 0; i < 5; i++){
        if (this.state.score >= this.state.savedStates[i].score){
          highScore = true;
        }
      }
      return highScore;
    }
    trimAndSubmit = () => {
      this.setState({
        previousBoards : 'deleted'
      }, ()=>{
        this.submit();
        // this.scoreState();
      })
    }

  submit = () => {
    if(this.state.name !== ''){
    fetch('/', {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    // .then(response => {
    //   response.json()
    .then(()=>{
      this.getScores();
    })
  }
}
scoreState = () =>{
  this.setState({
    showScores : true
  })
}
getScores = () => {
  fetch('/states', {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {return response.json()})
  .then((json) => {this.setState({savedStates : json},
    ()=>{
      this.controlTimeWarp('start')
      this.scoreState()
    }
    )})
}

  handleChange = (e) => {
    this.setState({ name: e.target.value })
  }

  trackBoard = (boardCopy) => {
    let previousBoardsCopy = this.state.previousBoards.map(row => row.slice())
    previousBoardsCopy.push(boardCopy)
    return previousBoardsCopy
  }
  moveTimeWarpIndex = () => {
      let plusOne = this.state.timeWarpIndex + 1;
      if (plusOne === this.state.savedStates[0].previousBoards.length){
        this.setState({timeWarpIndex : 1})
      } else {
      this.setState({timeWarpIndex: plusOne})
      }
  }
  controlTimeWarp = (command) => {
    let interval;
    if(command === 'start'){
      interval = setInterval(this.moveTimeWarpIndex, 140)
    } else if (command === 'stop') {
      clearInterval(interval);
    }
  }

  render() {
    
    return (
      <div>
        <ScoreBoard 
          showScores={this.state.showScores} 
          savedStates = {this.state.savedStates}
          index = {this.state.timeWarpIndex}
          // previousBoards = {this.state.previousBoards}
          />
        <GameOver 
          id="gameOver" 
          showScores={this.state.showScores} 
          score={this.state.score} 
          gameOver={this.state.gameOver} />
        <Form 
          gameOver={this.state.gameOver} 
          showScores={this.state.showScores} 
          handleClick={this.submitCheck} 
          nameValue={this.state.name} 
          handleChange={this.handleChange} />
        <Display
          state={this.state}
          makeRow={this.makeRow}
          stop={this.stop}
          start={this.start}
          endGame={this.submitCheck}
          />
      </div>
    )
  }
}

export default App;
