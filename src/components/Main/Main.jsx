import React, { Component } from 'react';
import Square from '../Square/Square.jsx';
import Piece from '../Piece/Piece.jsx';
import {WidthBoard, HeightBoard, SizeSquare} from '../../constants.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
 
class Main extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const pieces = this.props.squares.map(function(square){
      return <Square key = {square.id} base={HeightBoard-1} posX={square.posX} posY={square.posY} aColor={square.aColor} />      
    });

    return (
      <div className="main" style={{height: HeightBoard*SizeSquare, width: WidthBoard*SizeSquare}}>
        <Piece piece={this.props.piece} posX={this.props.fallingPieceX} posY={this.props.fallingPieceY} />      
        ficha cayendo: <br/> Numero de cuadraditos: {this.props.squares.length}
        <br/> 
          <ReactCSSTransitionGroup transitionEnterTimeout={500}
          transitionLeaveTimeout={400} transitionName="animation">
            {pieces}
          </ReactCSSTransitionGroup> 
      </div>
    );
  }
}

export default Main;
