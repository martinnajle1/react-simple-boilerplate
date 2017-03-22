import React, { Component } from 'react';
import {Size, Width, Height} from '../../constants.js';
import square from './square.scss';

class Square extends Component {
	
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="square" style={{ 
    	left:(this.props.piece.fallingPieceX*Size)+'px',  
	    top:(((Height-1)*Size)-this.props.piece.fallingPieceY*Size)+'px', 
	    height: Size +'px', 
	    width: Size +'px', 
	    background: this.props.piece.aColor
	}}/>;
  }
}

export default Square;
