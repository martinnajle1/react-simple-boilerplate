import React from 'react';
import PropTypes from 'prop-types';
import {SizePiece} from '../../constants.js';
import Square from '../Square/Square.jsx';
import uuidV4 from 'uuid/v4';
import styled from 'styled-components';

const StyledNextPiece = styled.div`
  border: 3px solid red;
  width: 80px;
  height: 80px;
  position: absolute;
`;

const DisplayNextPiece = (props) => {
  let squares = [];
  let posX = 0;
  let posY = 0;

  const newPiece = props.nextPiece;

  const StyledSquare = styled(Square)`
   box-sizing: border-box;
   border:gray solid 1px;               
   border-radius: 3px; 
   position: absolute; 
`;
  squares = newPiece.getSquares().map(function (square) {
    return (<StyledSquare base={3} key={uuidV4()}
      posX={posX + (square % SizePiece)}
      posY={(posY + Math.floor(square / SizePiece))}
      aColor={newPiece.piece.aColor}/>
    );
  });
  return (
    <div className="moduleNextPiece">
      <StyledNextPiece>{squares}</StyledNextPiece>
    </div>
  );
};
DisplayNextPiece.propTypes = {
  'nextPiece': PropTypes.object
};
export default DisplayNextPiece;
