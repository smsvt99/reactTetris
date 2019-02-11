import React, { Component } from 'react';

const style  = {
    textAlign: 'center',
    position: 'Absolute',
    width: '20%',
    left: '40%',
    top: '100%'
}
const inputStyle = {
    border : '2px solid white',
    backgroundColor : 'rgba(0,0,0,.8)',
    height: '50px',
    width: '250px',
    color: 'white',
    fontSize: '30px',
    borderRadius: '5px',
    textAlign: 'center',
}
const buttonStyle = {
    height: '50px',
    width: '250px',
    marginTop: '10px',
    fontSize: '20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: '2px solid black'

}

class Form extends Component {
    render = (props) => {
        if (this.props.gameOver & !this.props.showScores){
        return (
            <div style={style}>
                <input style={inputStyle} type="text" onChange={(e) => this.props.handleChange(e)} value={this.props.nameValue} />
                <button style={buttonStyle} onClick={this.props.handleClick}>Submit</button>
            </div>
        );
        } else {
            return null;
        }
    }   
}

export default Form;