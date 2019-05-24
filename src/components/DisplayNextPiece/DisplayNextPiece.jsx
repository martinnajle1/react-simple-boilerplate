import React, { Component } from 'react';
import {SizePiece} from '../../constants.js';
import Square from '../Square/Square.jsx';
const uuidV4 = require('uuid/v4');

import {SizeSquare} from '../../constants.js';
import './DisplayNextPiece.scss';
class DisplayNextPiece extends Component {
	
  constructor(props) {
    super(props);
  }

  render() {
    let squares = [];
    let posX = 0;
    let posY = 0;

    const newPiece = this.props.nextPiece; 

    squares = newPiece.getSquares().map(function(square){
        return <Square base={3} key={uuidV4()} posX={posX+(square % SizePiece)} posY={(posY+Math.floor(square / SizePiece))} aColor={newPiece.piece.aColor}/>;
    });
    return <div className='moduleNextPiece'><div className='nextPiece'>{squares}</div></div>;
  }
}

export default DisplayNextPiece;
