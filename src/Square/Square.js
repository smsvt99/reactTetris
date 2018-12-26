import React from 'react'

const Square = (props) => {
    function getColor(key){
		switch(key[0]) {
            case "e" : return 'grey';
            case "y" : return 'yellow';
			case "b" : return 'blue';
			case "r" : return 'red';
			case "g" : return 'green';
            case 'o' : return 'orange';
            case 'p' : return 'purple';
            case 'v' : return 'violet';
            case 'w' : return 'white';
            default : return 'grey';	
		}
	}
	
	let style = {
		backgroundColor: getColor(props.colorKey)
		} 
	
	
  return(
   <td style={style}></td>
  );
}

export default Square;