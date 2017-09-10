import React from 'react';
const Scorer = ({score, level, speed}) => {
	return (
	  <div className = 'moduleScorer'>
	  	<div>score: {score}</div>	
	  	<div>level: {level}</div>	
	  	<div>speed: {speed}</div>	
	  </div>
	)
}
export default Scorer;
