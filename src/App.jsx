import React, { Component } from 'react';
import keydown, { Keys } from 'react-keydown';
// Components.
import Piece from './components/Piece';
// const uuidV4 = require('uuid/v4');
import Main from './components/Main/Main';
import constants from './constants.js';
const colors = ['lightsalmon', 'antiquewhite', 'lightseagreen', 'aqua',
'lightskyblue','aquamarine','lightslategray','azure','lightsteelblue'];
const uuidV4 = require('uuid/v4');

@keydown
class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      piece: new Piece(),
      fallingPieceX: 0,
      fallingPieceY: constants.Height,
      speed: constants.InitialSpeed,
      squares: []
    };
  }

  detectLine() {
    var {squares} = this.state;
    var lines = squares.reduce(function(acc, square){
        if (acc[square.posY]) acc[square.posY]++
        else acc[square.posY] = 1;
      return acc;
      },[])
    .reduce(function(acc, line, index){
      if (line === constants.Width) {
        acc.push(index); 
        console.log('LINE DETECTED:', index);
      }
      return acc;
    }, []);
    if (lines.length > 0) {
        var acc = squares.filter(function(square){
            if (!lines.includes(square.posY)) {
                square.posY = square.posY - lines.filter(function(line) {return line < square.posY;}).length;
                return square;
            }
        });
      this.setState({ squares: acc }); 
    }
  }

  collisioned (pieceFalling, fallingX, fallingY) {
    return this.state.squares.some( function(square){
      return pieceFalling.getSquares().some( function(squareFalling) {
        return ( ((fallingX+(squareFalling %4)) === (square.posX)) &&
         ((fallingY+(Math.floor(squareFalling /4))) === (square.posY)) );
      
      });
    });
  }

  getColorRandom() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  componentWillReceiveProps( { keydown } ) {

    if ( keydown.event ) {

      let {fallingPieceX, fallingPieceY, speed, piece} = this.state;
      switch (keydown.event.which) {
        case constants.ArrowLeft: {
          fallingPieceX = fallingPieceX + 1;
          if ((this.collisioned(piece, fallingPieceX, fallingPieceY)))
          {
            fallingPieceX = fallingPieceX - 1;
          }
          if (fallingPieceX+piece.getSize() === constants.Width+1) fallingPieceX = fallingPieceX-1;
        }
        break;
        case constants.ArrowRight:  {
          fallingPieceX = fallingPieceX - 1;
          if ((this.collisioned(piece, fallingPieceX, fallingPieceY)))
          {
            fallingPieceX = fallingPieceX + 1;
          }
          if (fallingPieceX < 0) fallingPieceX = 0;
        }
        break;
        case constants.Enter: {
            speed = 10;
          }  
          break;
        case constants.LetterR: {
            piece.rotateRight();
          } 
        break;
        case constants.LetterT: {
            piece.rotateLeft();
          } 
        break;
      }
      this.setState({ fallingPieceX, fallingPieceY, speed});
    }
  }
 
  componentDidMount() {
    const myFunction = () => {
      
      let {piece, fallingPieceY, fallingPieceX, speed, squares} = this.state;
      fallingPieceY = fallingPieceY-1;

      if ((fallingPieceY < 0) || (this.collisioned(piece, fallingPieceX, fallingPieceY))){
        speed = constants.InitialSpeed; 
        piece.id = uuidV4();// Generate a v4 UUID (random) 
        fallingPieceY = fallingPieceY +1;
        let squaresPiece = piece.getSquares().map(function(square) {
          return ({posX: Math.floor(square%4)+fallingPieceX, posY: Math.floor(square/4)+fallingPieceY, aColor: piece.piece.aColor});
        });
        squares = [...this.state.squares, ...squaresPiece];
        
        fallingPieceX = 0;
        piece = new Piece();
        fallingPieceY= 20;
        fallingPieceX= fallingPieceX;
      }

      this.setState({
        piece: piece,
        fallingPieceY: fallingPieceY,
        fallingPieceX: fallingPieceX,
        speed: speed,
        squares: squares
      });
      
      this.detectLine();

      setTimeout(myFunction, this.state.speed);
    }
    var timeout= setTimeout(myFunction, this.state.speed);
  }

  render() {
    return (
        <div className="container">
          speed: {this.state.speed}
          <Main {...this.state}/>
        </div>
    );
  }
}

export default App;
