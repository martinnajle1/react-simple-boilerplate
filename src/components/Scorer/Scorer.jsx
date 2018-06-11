import React from 'react';
import PropTypes from 'prop-types';

const Scorer = ({score, level, speed}) => {
  return (
    <div className = "moduleScorer">
      <div>score: {score}</div>
      <div>level: {level}</div>
      <div>speed: {speed}</div>
    </div>
  );
};
Scorer.propTypes = {
  'score': PropTypes.number,
  'level': PropTypes.number,
  'speed': PropTypes.number
};
export default Scorer;
