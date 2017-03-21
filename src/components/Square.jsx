import React, { Component } from 'react';

class Square extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div style={{ boxSizing: 'border-box',border:'gray solid 1px',
                borderRadius: '3px', position: 'absolute', left:(this.props.piece.fallingPieceX*20)+'px',  top:((19*20)-this.props.piece.fallingPieceY*20)+'px', height: '20px', width: '20px', background: this.props.piece.aColor}}/>;
  }
}

export default Square;