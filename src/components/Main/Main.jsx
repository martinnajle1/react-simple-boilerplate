import React from 'react';
import PropTypes from 'prop-types';
import Square from '../Square/Square.jsx';
import Piece from '../Piece/Piece.jsx';
import {WidthBoard, HeightBoard, SizeSquare} from '../../constants.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const Main = (props) => {
  const {piece, fallingPieceX, fallingPieceY, squares} = props;
  const pieces = squares.map(function (square) {
    return (
      <Square key={square.id}
        base={HeightBoard - 1}
        posX={square.posX}
        posY={square.posY}
        aColor={square.aColor}
      />
    );
  });
  return (
    <div className="main" style={{
      'height': `${HeightBoard * SizeSquare}px`,
      'width': `${WidthBoard * SizeSquare}px`}}>
      <Piece piece={piece} posX={fallingPieceX} posY={fallingPieceY} />
      <br/>
      <ReactCSSTransitionGroup transitionEnterTimeout={500}
      transitionLeaveTimeout={400} transitionName="animation">
        {pieces}
      </ReactCSSTransitionGroup>
    </div>
  );
};
Main.propTypes = {
  'piece': PropTypes.arrayOf(PropTypes.object),
  'fallingPieceX': PropTypes.number,
  'fallingPieceY': PropTypes.number,
  'squares': PropTypes.array
};

export default Main;
