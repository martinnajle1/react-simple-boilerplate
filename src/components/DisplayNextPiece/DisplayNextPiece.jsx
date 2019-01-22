import React from 'react';
import PropTypes from 'prop-types';
import {SizePiece} from '../../constants.js';
import Square from '../Square/Square.jsx';
import uuidV4 from 'uuid/v4';
import styled from 'styled-components';


const WrapperModule = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 20px rgb(129, 183, 255);
  -moz-box-shadow: inset 0 0 20px rgb(129, 183, 255);
  -webkit-box-shadow: inset 0 0 20px rgb(129, 183, 255);
  background: rgb(227, 242, 255);
`;
const StyledNextPiece = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 3px;
  position: relative;
`;

const StyledSquare = styled(Square)`
   margin: auto;
   box-sizing: border-box;
   border:gray solid 1px;               
   border-radius: 3px; 
   position: absolute;
`;

const DisplayNextPiece = (props) => {
  let squares = [];
  const newPiece = props.nextPiece;

  squares = newPiece.getSquares().map(function (square) {
    return (<StyledSquare base={3} key={uuidV4()}
      posX={(square % SizePiece)}
      posY={(Math.floor(square / SizePiece))}
      aColor={newPiece.piece.aColor}/>
    );
  });
  return (
    <div className="moduleNextPiece">
      <WrapperModule>
        <StyledNextPiece>{squares}</StyledNextPiece>
      </WrapperModule>
    </div>
  );
};
DisplayNextPiece.propTypes = {
  'nextPiece': PropTypes.object
};
export default DisplayNextPiece;
