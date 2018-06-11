import React from 'react';
import PropTypes from 'prop-types';
import {SizeSquare} from '../../constants.js';
import './square.scss';
import classNames from 'classnames';

const Square = (props) => {
  const {posX, posY, base, aColor} = props;
  return (
    <div className={classNames(aColor, 'square')} style={{
      'left': `${posX * SizeSquare}px`,
      'top': `${(base * SizeSquare) - (posY * SizeSquare)}px`,
      'height': `${SizeSquare}px`,
      'width': `${SizeSquare}px`
    }}/>
  );
};

Square.propTypes = {
  'posX': PropTypes.number,
  'posY': PropTypes.number,
  'base': PropTypes.number,
  'aColor': PropTypes.string
};

export default Square;
