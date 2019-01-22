import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {SizeSquare} from '../../constants.js';

const Square = (props) => {
  const {posX, posY, base, aColor} = props;
  const stylePosition = {
    'left': `${posX * SizeSquare}px`,
    'top': `${(base * SizeSquare) - (posY * SizeSquare)}px`,
    'height': `${SizeSquare}px`,
    'width': `${SizeSquare}px`
  };
  /* box-shadow: inset 0 0 5px ${aColor};
    -moz-box-shadow: inset 0 0 5px ${aColor};
    -webkit-box-shadow: inset 0 0 5px ${aColor};*/

  const StyledSquare = styled.div`
    border: 3px solid red;
    width: 80px;
    height: 80px;
    position: absolute;
    background: ${aColor};
    boxSizing: border-box;
    border:gray solid 1px;               
    borderRadius: 3px; 
    position: absolute; 
  `;
  return (
    <StyledSquare style={stylePosition} />
  );
};

Square.propTypes = {
  'posX': PropTypes.number,
  'posY': PropTypes.number,
  'base': PropTypes.number,
  'aColor': PropTypes.string
};

export default Square;
