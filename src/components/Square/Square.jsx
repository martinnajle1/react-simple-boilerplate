import React, { Component } from 'react';
import {Size, Width, Height} from '../../constants.js';
import square from './square.scss';


class Square extends Component {
	
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="square" style={{ 
    	left:(this.props.posX*Size)+'px',  
	    top:(((Height-1)*Size)-this.props.posY*Size)+'px', 
	    height: Size +'px', 
	    width: Size +'px', 
	    background: this.props.aColor
	}}/>;
  }
}

export default Square;
