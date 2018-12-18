import React from 'react'

const Square = (props) => {
    function getColor(key){
		switch(key) {
			case "e" : return 'grey';
			case "b" : return 'blue';
			case "r" : return 'red';
			case "g" : return 'green';
            case 'o' : return 'orange';
            case 'p' : return 'purple';
            case 'v' : return 'violet';	
		}
	}
	
	let stylez = {
		backgroundColor: getColor(props.colorKey)
		} 
	
	
  return(
   <td style={stylez}></td>
  );
}

export default Square;