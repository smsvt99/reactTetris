import React from 'react'
import Square from '../Square/Square'

const rankStyle = {
    display: 'inline',
    fontSize: '70px',
    marginRight: '30px'
}
const nameStyle = {
    display: 'inline',
}
const scoreStyle = {
    display: 'inline',
}
const tableStyle = {
    display: 'inline',
    margin: 'auto',
}
const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
}
const columnStyle = {
    border: '3px solid black',
    borderRadius: '20px',
    margin: '5px 20px',
    padding: '5px',
    backgroundColor: 'white',
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
}

const ScoreBoard = (props) => {
    function makeRow(num, i) {
        return (
            <tr>
                <Square sizeKey='small' colorKey={props.savedStates[i].board[num][0]} />
                <Square sizeKey='small' colorKey={props.savedStates[i].board[num][1]} />
                <Square sizeKey='small' colorKey={props.savedStates[i].board[num][2]} />
                <Square sizeKey='small' colorKey={props.savedStates[i].board[num][3]} />
                <Square sizeKey='small' colorKey={props.savedStates[i].board[num][4]} />
                <Square sizeKey='small' colorKey={props.savedStates[i].board[num][5]} />
                <Square sizeKey='small' colorKey={props.savedStates[i].board[num][6]} />
                <Square sizeKey='small' colorKey={props.savedStates[i].board[num][7]} />
                <Square sizeKey='small' colorKey={props.savedStates[i].board[num][8]} />
                <Square sizeKey='small' colorKey={props.savedStates[i].board[num][9]} />
            </tr>
        )
    }
    if (props.showScores) {
        return (
            <div style={columnStyle}>
                <h1 style={nameStyle}>{props.savedStates[0].name}</h1>
                <div style={containerStyle}>
                    <h1 style={rankStyle}>1st</h1>
                    <table style={tableStyle}>
                        <tbody>
                            {makeRow(0, 0)}
                            {makeRow(1, 0)}
                            {makeRow(2, 0)}
                            {makeRow(3, 0)}
                            {makeRow(4, 0)}
                            {makeRow(5, 0)}
                            {makeRow(6, 0)}
                            {makeRow(7, 0)}
                            {makeRow(8, 0)}
                            {makeRow(9, 0)}
                            {makeRow(10, 0)}
                            {makeRow(11, 0)}
                            {makeRow(12, 0)}
                            {makeRow(13, 0)}
                            {makeRow(14, 0)}
                            {makeRow(15, 0)}
                            {makeRow(16, 0)}
                            {makeRow(17, 0)}
                        </tbody>
                    </table>
                </div>
                <h1 style={scoreStyle}>{props.savedStates[0].score} points</h1>
            </div>

        )
    } else {
        return null;
    }

}

export default ScoreBoard;
