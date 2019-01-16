import React from 'react';
import PropTypes from 'prop-types';
import Square from '../Square/Square.jsx';
import uuidV4 from 'uuid/v4';
import {SizePiece, HeightBoard} from '../../constants.js';
const Piece = (props) => {
  let squares = [];
  const {posX, posY, 'piece': newPiece} = props;
  squares = newPiece.getSquares().map(function (square) {
    return (
      <Square key={uuidV4()}
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
