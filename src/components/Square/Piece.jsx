import React, { Component } from 'react';
import {Size, Width, Height, Pieces} from '../../constants.js';
import style from './square.scss';
import Square from './Square.jsx';
const uuidV4 = require('uuid/v4');

class Piece extends Component {
	
  constructor(props) {
    super(props);
  }

  

  render() {
    let squares = [];
    const {posX, posY} = this.props;
    const newPiece = this.props.piece; 

    squares = newPiece.getSquares().map(function(square){
        return <Square key={uuidV4()} posX={posX+(square % 4)} posY={(posY+Math.floor(square / 4))} aColor={newPiece.piece.aColor}/>;
    });
    return <div>{squares}</div>;
  }
}

export default Piece;