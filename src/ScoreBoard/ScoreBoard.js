import React from 'react'
import Square from '../Square/Square'

const rankStyle = {
    display: 'inline',
    fontSize: '60px',
    marginRight: '10px',
    marginLeft: '25px',
    textAlign: 'center'
}
const nameStyle = {
    display: 'inline',
    fontSize: '35px',
    maxWidth: '90%',
    marginBottom: '10px',
    marginTop: '10px'
}
const scoreStyle = {
    marginTop: '0px',
    display: 'inline',
    marginBottom: '15px',
}
const tableStyle = {
    display: 'inline',
    margin: 'auto',
}
const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
}
const columnStyle = {
    border: '3px solid black',
    borderRadius: '20px',
    margin: '20px 20px',
    padding: '5px',
    backgroundColor: 'white',
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
}
const boardStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '50px',
    paddingTop: '20px'
}
const titleStyle = {
    textAlign: 'center',
    marginTop: '50px',
    marginBottom: '20px'
}
const linkStyle = {
    textAlign: 'center',
    marginBottom: '50px',
    fontSize: '22px'
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
    function makeCard(i, rank, crown){
            return (
                <div style={columnStyle}>
                    <h1 style={nameStyle}>{crown + props.savedStates[i].name}</h1>
                    <div style={containerStyle}>
                        <h1 style={rankStyle}>{rank}</h1>
                        <table style={tableStyle}>
                            <tbody>
                                {makeRow(0, i)}
                                {makeRow(1, i)}
                                {makeRow(2, i)}
                                {makeRow(3, i)}
                                {makeRow(4, i)}
                                {makeRow(5, i)}
                                {makeRow(6, i)}
                                {makeRow(7, i)}
                                {makeRow(8, i)}
                                {makeRow(9, i)}
                                {makeRow(10, i)}
                                {makeRow(11, i)}
                                {makeRow(12, i)}
                                {makeRow(13, i)}
                                {makeRow(14, i)}
                                {makeRow(15, i)}
                                {makeRow(16, i)}
                                {makeRow(17, i)}
                            </tbody>
                        </table>
                    </div>
                    <h1 style={scoreStyle}>{props.savedStates[i].score} points</h1>
                </div>
    
            )
 
    }
    if (props.showScores) {

    return (
        <div>
        <h1 style={titleStyle}>React TETRIS High Scores</h1>

        <div style={boardStyle}>
            {makeCard(0, '1st', '👑 ')}
            {makeCard(1, '2nd', '')}
            {makeCard(2, '3rd', '')}
            {makeCard(3, '4th', '')}
            {makeCard(4, '5th', '')}
            {makeCard(5, '6th', '')}
            {makeCard(6, '7th', '')}
            {makeCard(7, '8th', '')}
            {makeCard(8, '9th', '')}
            {makeCard(9, '10th', '')}
            {makeCard(10, '11th', '')}
            {makeCard(11, '12th', '')}
        </div>
        <a href='./'><p style={linkStyle}>Play Again?</p></a>
        </div>
    )} else {
        return null;
    }
}
    


export default ScoreBoard;
