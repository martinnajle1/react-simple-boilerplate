import React from 'react';
import PropTypes from 'prop-types';
import {SizePiece} from '../../constants.js';
import Square from '../Square/Square.jsx';
import uuidV4 from 'uuid/v4';
import './DisplayNextPiece.scss';
const DisplayNextPiece = (props) => {
  let squares = [];
  let posX = 0;
  let posY = 0;

  const newPiece = props.nextPiece;

  squares = newPiece.getSquares().map(function (square) {
    return (<Square base={3} key={uuidV4()}
      posX={posX + (square % SizePiece)}
      posY={(posY + Math.floor(square / SizePiece))}
      aColor={newPiece.piece.aColor}/>
    );
  });
  return <div className="moduleNextPiece"><div className="nextPiece">{squares}</div></div>;
};
DisplayNextPiece.propTypes = {
  'nextPiece': PropTypes.arrayOf(PropTypes.object)
};
export default DisplayNextPiece;
