import React from 'react';
import PropTypes from 'prop-types';
import Square from '../Square/Square.jsx';
import {SizePiece, HeightBoard} from '../../constants.js';
const Piece = (props) => {
  let squares = [];
  const {posX, posY, 'piece': newPiece} = props;
  squares = newPiece.getSquares().map(function (square, index) {
    return (
      <Square key={index}
        base={(HeightBoard - 1)}
        posX={posX + (square % SizePiece)}
        posY={(posY + Math.floor(square / SizePiece))}
        aColor={newPiece.piece.aColor}/>
      );
  });
  return <div>{squares}</div>;
};
Piece.propTypes = {
  'posX': PropTypes.number,
  'posY': PropTypes.number,
  'piece': PropTypes.object
};
export default Piece;
