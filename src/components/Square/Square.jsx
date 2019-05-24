import React, { Component } from 'react';
import {HeightBoard, SizeSquare} from '../../constants.js';
import square from './square.scss';
const classNames = require('classnames');



class Square extends Component {
	
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={classNames(this.props.aColor, 'square')} style={{ 
    	left:(this.props.posX*SizeSquare)+'px',  
	    top:((this.props.base*SizeSquare)-this.props.posY*SizeSquare)+'px', 
	    height: SizeSquare +'px', 
	    width: SizeSquare +'px'
	  }}/>;
  }
}

export default Square;
