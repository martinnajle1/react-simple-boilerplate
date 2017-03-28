import React, { Component } from 'react';
import {SizePiece} from '../../constants.js';
import style from '../Square/square.scss';
import Square from '../Square/Square.jsx';
const uuidV4 = require('uuid/v4');

import {SizeSquare} from '../../constants.js';
class Piece extends Component {
	
  constructor(props) {
    super(props);
  }

  

  render() {
    let squares = [];
    const {posX, posY} = this.props;
    const newPiece = this.props.piece; 

    squares = newPiece.getSquares().map(function(square){
        return <Square key={uuidV4()} posX={posX+(square % SizePiece)} posY={(posY+Math.floor(square / SizePiece))} aColor={newPiece.piece.aColor}/>;
    });
    return <div>{squares}</div>;
  }
}

export default Piece;