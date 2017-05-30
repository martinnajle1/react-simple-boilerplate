import React, { Component } from 'react';
import score from './score.scss';


class Score extends Component {
	
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="score"> 
          SCORE: {this.props.score}
          LEVEL: {this.props.level}
          SPEED: {this.props.speed}
    </div>;
  }
}

export default Score;
