import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Square from '../Square/Square.jsx';
import Piece from '../Piece/Piece.jsx';
import {WidthBoard, HeightBoard, SizeSquare} from '../../constants.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Wrapper = styled.div`
  border: 2px solid black;
  border-top: none;
  position: relative;
  display: inline-block;
  height: ${HeightBoard * SizeSquare}px;
  width: ${WidthBoard * SizeSquare}px;
  & .animation-leave {
    opacity: 1;
  }
  & .animation-leave.animation-leave-active {
    opacity: 0.01;
    transition: opacity 400ms ease-out;
  }`;
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
    <Wrapper>
      <Piece piece={piece} posX={fallingPieceX} posY={fallingPieceY} />
      <br/>
      <ReactCSSTransitionGroup transitionEnterTimeout={500}
      transitionLeaveTimeout={400} transitionName="animation">
        {pieces}
      </ReactCSSTransitionGroup>
    </Wrapper>
  );
};
Main.propTypes = {
  'piece': PropTypes.arrayOf(PropTypes.object),
  'fallingPieceX': PropTypes.number,
  'fallingPieceY': PropTypes.number,
  'squares': PropTypes.array
};

export default Main;
