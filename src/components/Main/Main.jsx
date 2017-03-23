import React, { Component } from 'react';
import Square from '../Square/Square.jsx';
import Piece from '../Square/Piece.jsx';
import {Width, Height, Size} from '../../constants.js';
 
class Main extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const pieces = this.props.pieces.map(function(piece){
      debugger;
      return <Piece key={piece.id} piece={piece.piece} posX={piece.posX} posY={piece.posY}/>      
    });

    return (
      <div className="main" style={{ position: 'relative', height: Height*Size, width: Width*Size}}>
        <Piece piece={this.props.piece} posX={this.props.fallingPieceX} posY={this.props.fallingPieceY}/>      
        ficha cayendo: <br/>
        <br/>  
        {pieces}
      </div>
    );
  }
}

export default Main;
