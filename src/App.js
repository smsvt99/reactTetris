import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: Array(18).fill(Array(10).fill('e')),
      currentPiece: [],
      currentPieceName: null,
      currentColor: null,
      gameBegun: false,
      stopped: true,
    }
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
      window.addEventListener('keypress', keyRouter)
      // console.log('start')
      if (App.state.stopped) {
        App.setState({ stopped: false })
        // gravity();
        if (!App.state.gameBegun) {
          // getRandomPiece();
        }
      }
    }
    stop = () => {
      window.removeEventListener('keypress', keyRouter)
      // console.log('stop')
      App.setState({ stopped: true })
      // clearTimeout(gravityTimeout);
    }

    getRandomPiece = () => {
      console.log('get random piece')
      const min = 0;
      const max = 7;
      // const random = Math.floor(Math.random() * (max - min)) + min;

      const pieceArray = ['O', 'I', 'S', 'Z', 'L', 'J', 'T']
      if (!this.state.stopped) {
        // this.generatePiece(pieceArray[random])
        this.generatePiece(pieceArray[0])

      }
    };

    generatePiece = (shapeName) => {
      // console.log('generatePiece')
      this.setState({
        currentPieceName: shapeName,
        gameBegun: true
      })
      // clearMs();
      // checkForFullRows();
      // checkForGameOver();
      let boardCopy = this.state.board.slice()
      if (shapeName === 'O') {
        boardCopy[0][4] = 'ym';
        boardCopy[0][5] = 'ym';
        boardCopy[1][4] = 'ym';
        boardCopy[1][5] = 'ym';
        this.setState({
          board: boardCopy,
          currentColor: 'y',
          currentPiece: [[0, 4], [0, 5], [1, 4], [1, 5]]
        })
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
    };

    // const gravity = () => {
    //   // i.e., is the current piece allowed to descend, or is something in the way
    //   let allowed = true;
    //   console.log('gravity')
    //   if (logging) {
    //       console.log(board)
    //   }

    //   if (checkForFloor() || checkForBlocksBeneath()) {
    //       getRandomPiece();
    //       allowed = false;
    //   }

    //   if (allowed) {
    //       //mark all the spaces corresponding to the current piece to empty
    //       for (let i = 0; i < currentPiece.length; i++) {
    //           board[currentPiece[i][0]][currentPiece[i][1]] = 'e'
    //       }
    //       //change all the spaces below current piece to the values of current piece
    //       for (let i = 0; i < currentPiece.length; i++) {
    //           if (currentPiece[i][0] + 1 < 18) {
    //               board[currentPiece[i][0] + 1][currentPiece[i][1]] = currentColor + 'm';
    //           }
    //       }
    //       //update the state of current piece
    //       for (let i = 0; i < currentPiece.length; i++) {
    //           currentPiece[i][0] = currentPiece[i][0] + 1
    //       }
    //   }
    //   drawBoard();
    //   if (!stopped){
    //       gravityTimeout = setTimeout(gravity, 1000);
    //   }
    // }

    drawBoard = () => {
      for (let i = 0; i <= 17; i++) {
        for (let j = 0; j <= 9; j++) {
          if (this.state.board[i][j] === 'e') {
            console.log(i.toString() + j.toString())
            document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'grey';
          }
          //animation for a full row
          if (this.board[i][j] === 'ew') {
            document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'white';

            setTimeout(function () {
              document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'grey'
            }, 300)

            setTimeout(function () {
              document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'white'
            }, 300)

            setTimeout(function () {
              document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'grey'
            }, 300)

            setTimeout(function () {
              document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'white'
            }, 300)
          }
          if (this.state.board[i][j].includes('y')) {
            document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'yellow'
          }
          if (this.state.board[i][j].includes('b')) {
            document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'lightBlue'
          }
          if (this.state.board[i][j].includes('r')) {
            document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'red'
          }
          if (this.state.board[i][j].includes('g')) {
            document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'green'
          }
          if (this.state.board[i][j].includes('o')) {
            document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'orange'
          }
          if (this.state.board[i][j].includes('p')) {
            document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'pink'
          }
          if (this.state.board[i][j].includes('v')) {
            document.getElementById(i.toString() + j.toString()).style.backgroundColor = 'violet'
          }
        }
      }
    }
    componentDidMount(drawBoard)    
    render() {
      return (
        <div id="content">
          <div id="innerDiv">
            <h1>TETRIS</h1>

            <p>Control pieces with W, A, S and D.</p>
            <p>Regretably, pieces do not yet rotate.</p>
            <button onClick={this.start}>Start</button>
            <button onClick={this.stop}>Stop</button>
            <table>
              <tbody>
                <tr>
                  <td id="00"></td>
                  <td id="01"></td>
                  <td id="02"></td>
                  <td id="03"></td>
                  <td id="04"></td>
                  <td id="05"></td>
                  <td id="06"></td>
                  <td id="07"></td>
                  <td id="08"></td>
                  <td id="09"></td>
                </tr>
                <tr>
                  <td id="10"></td>
                  <td id="11"></td>
                  <td id="12"></td>
                  <td id="13"></td>
                  <td id="14"></td>
                  <td id="15"></td>
                  <td id="16"></td>
                  <td id="17"></td>
                  <td id="18"></td>
                  <td id="19"></td>
                </tr>
                <tr>
                  <td id="20"></td>
                  <td id="21"></td>
                  <td id="22"></td>
                  <td id="23"></td>
                  <td id="24"></td>
                  <td id="25"></td>
                  <td id="26"></td>
                  <td id="27"></td>
                  <td id="28"></td>
                  <td id="29"></td>
                </tr>
                <tr>
                  <td id="30"></td>
                  <td id="31"></td>
                  <td id="32"></td>
                  <td id="33"></td>
                  <td id="34"></td>
                  <td id="35"></td>
                  <td id="36"></td>
                  <td id="37"></td>
                  <td id="38"></td>
                  <td id="39"></td>
                </tr>
                <tr>
                  <td id='40'></td>
                  <td id='41'></td>
                  <td id='42'></td>
                  <td id='43'></td>
                  <td id='44'></td>
                  <td id='45'></td>
                  <td id='46'></td>
                  <td id='47'></td>
                  <td id='48'></td>
                  <td id='49'></td>
                </tr>
                <tr>
                  <td id='50'></td>
                  <td id='51'></td>
                  <td id='52'></td>
                  <td id='53'></td>
                  <td id='54'></td>
                  <td id='55'></td>
                  <td id='56'></td>
                  <td id='57'></td>
                  <td id='58'></td>
                  <td id='59'></td>
                </tr>
                <tr>
                  <td id='60'></td>
                  <td id='61'></td>
                  <td id='62'></td>
                  <td id='63'></td>
                  <td id='64'></td>
                  <td id='65'></td>
                  <td id='66'></td>
                  <td id='67'></td>
                  <td id='68'></td>
                  <td id='69'></td>
                </tr>
                <tr>
                  <td id='70'></td>
                  <td id='71'></td>
                  <td id='72'></td>
                  <td id='73'></td>
                  <td id='74'></td>
                  <td id='75'></td>
                  <td id='76'></td>
                  <td id='77'></td>
                  <td id='78'></td>
                  <td id='79'></td>
                </tr>
                <tr>
                  <td id='80'></td>
                  <td id='81'></td>
                  <td id='82'></td>
                  <td id='83'></td>
                  <td id='84'></td>
                  <td id='85'></td>
                  <td id='86'></td>
                  <td id='87'></td>
                  <td id='88'></td>
                  <td id='89'></td>
                </tr>
                <tr>
                  <td id='90'></td>
                  <td id='91'></td>
                  <td id='92'></td>
                  <td id='93'></td>
                  <td id='94'></td>
                  <td id='95'></td>
                  <td id='96'></td>
                  <td id='97'></td>
                  <td id='98'></td>
                  <td id='99'></td>
                </tr>
                <tr>
                  <td id='100'></td>
                  <td id='101'></td>
                  <td id='102'></td>
                  <td id='103'></td>
                  <td id='104'></td>
                  <td id='105'></td>
                  <td id='106'></td>
                  <td id='107'></td>
                  <td id='108'></td>
                  <td id='109'></td>
                </tr>
                <tr>
                  <td id='110'></td>
                  <td id='111'></td>
                  <td id='112'></td>
                  <td id='113'></td>
                  <td id='114'></td>
                  <td id='115'></td>
                  <td id='116'></td>
                  <td id='117'></td>
                  <td id='118'></td>
                  <td id='119'></td>
                </tr>
                <tr>
                  <td id='120'></td>
                  <td id='121'></td>
                  <td id='122'></td>
                  <td id='123'></td>
                  <td id='124'></td>
                  <td id='125'></td>
                  <td id='126'></td>
                  <td id='127'></td>
                  <td id='128'></td>
                  <td id='129'></td>
                </tr>
                <tr>
                  <td id='130'></td>
                  <td id='131'></td>
                  <td id='132'></td>
                  <td id='133'></td>
                  <td id='134'></td>
                  <td id='135'></td>
                  <td id='136'></td>
                  <td id='137'></td>
                  <td id='138'></td>
                  <td id='139'></td>
                </tr>
                <tr>
                  <td id='140'></td>
                  <td id='141'></td>
                  <td id='142'></td>
                  <td id='143'></td>
                  <td id='144'></td>
                  <td id='145'></td>
                  <td id='146'></td>
                  <td id='147'></td>
                  <td id='148'></td>
                  <td id='149'></td>
                </tr>
                <tr>
                  <td id='150'></td>
                  <td id='151'></td>
                  <td id='152'></td>
                  <td id='153'></td>
                  <td id='154'></td>
                  <td id='155'></td>
                  <td id='156'></td>
                  <td id='157'></td>
                  <td id='158'></td>
                  <td id='159'></td>
                </tr>
                <tr>
                  <td id='160'></td>
                  <td id='161'></td>
                  <td id='162'></td>
                  <td id='163'></td>
                  <td id='164'></td>
                  <td id='165'></td>
                  <td id='166'></td>
                  <td id='167'></td>
                  <td id='168'></td>
                  <td id='169'></td>
                </tr>
                <tr>
                  <td id='170'></td>
                  <td id='171'></td>
                  <td id='172'></td>
                  <td id='173'></td>
                  <td id='174'></td>
                  <td id='175'></td>
                  <td id='176'></td>
                  <td id='177'></td>
                  <td id='178'></td>
                  <td id='179'></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }
}



  export default App;
