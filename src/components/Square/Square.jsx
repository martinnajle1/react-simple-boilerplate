import React, { Component } from 'react';
import {HeightBoard, SizeSquare} from '../../constants.js';
import square from './square.scss';


class Square extends Component {
	
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="square" style={{ 
    	left:(this.props.posX*SizeSquare)+'px',  
	    top:((this.props.base*SizeSquare)-this.props.posY*SizeSquare)+'px', 
	    height: SizeSquare +'px', 
	    width: SizeSquare +'px', 
	    background: this.props.aColor
	}}/>;
  }
}

export default Square;
