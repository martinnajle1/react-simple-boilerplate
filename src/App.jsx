import React, { Component } from 'react';
import keydown, { Keys } from 'react-keydown';
// Components.
import Piece from './components/Piece/Piece';
// const uuidV4 = require('uuid/v4');
import Main from './components/Main/Main';
import constants from './constants.js';

const uuidV4 = require('uuid/v4');


@keydown
class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      numberOfLines: 0,
      piece: new Piece(),
      fallingPieceX: 0,
      fallingPieceY: constants.HeightBoard,
      speed: constants.InitialSpeed,
      squares: [],
      matchLost: false,
      pause: false
    };
  }

  restartGame() {
    this.setState({
      numberOfLines: 0,
      matchLost: false,
      piece: new Piece(),
      fallingPieceX: 0,
      fallingPieceY: constants.HeightBoard,
      speed: constants.InitialSpeed,
      squares: [],
    });
  }

  detectLine() {
    var {squares, numberOfLines, speed} = this.state;
    var lines = squares.reduce(function(acc, square){
        if (acc[square.posY]) acc[square.posY]++
        else acc[square.posY] = 1;
      return acc;
      },[])
    .reduce(function(acc, line, index){
      if (line === constants.WidthBoard) {
        acc.push(index); 
        
      }
      return acc;
    }, []);
    if (lines.length > 0) {
        numberOfLines= lines.length + numberOfLines;
        var acc = squares.filter(function(square){
            if (!lines.includes(square.posY)) {
                square.posY = square.posY - lines.filter(function(line) {return line < square.posY;}).length;
                return square;
            }
        });
      this.setState({ squares: acc, speed, numberOfLines }); 
    }
  }

  collisioned (pieceFalling, fallingX, fallingY) {
    return this.state.squares.some( function(square){
      return pieceFalling.getSquares().some( function(squareFalling) {
        return ( ((fallingX+(squareFalling % constants.SizePiece)) === (square.posX)) &&
         ((fallingY+(Math.floor(squareFalling / constants.SizePiece))) === (square.posY)) );
      
      });
    });
  }

  componentWillReceiveProps( { keydown } ) {

    if ( keydown.event ) {

      let {fallingPieceX, fallingPieceY, speed, piece, pause} = this.state;
      switch (keydown.event.which) {
        case constants.ArrowLeft: {
          fallingPieceX = fallingPieceX + 1;
          if ((this.collisioned(piece, fallingPieceX, fallingPieceY)))
          {
            fallingPieceX = fallingPieceX - 1;
          }
          if (fallingPieceX+piece.getSize() === constants.WidthBoard+1) fallingPieceX = fallingPieceX-1;
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
            speed = constants.MaxSpeed;
          }  
        break;
        case constants.LetterP: {
            debugger;
            pause = !pause;
          }  
        break;
        case constants.LetterR: {
            piece.rotateRight();
            if (fallingPieceX + piece.getSize()>constants.WidthBoard) {
              piece.rotateLeft();
            }
          } 
        break;
        case constants.LetterT: {
            piece.rotateLeft();
            if (fallingPieceX + piece.getSize()>constants.WidthBoard)  {
              piece.rotateRight();
            }
          } 
        break;
      }
      this.setState({ fallingPieceX, fallingPieceY, speed, pause});
    }
  }
 
  componentDidMount() {
    const myFunction = () => {
      let {piece, fallingPieceY, fallingPieceX, speed, squares, matchLost, pause} = this.state;

      if (!pause) {
        fallingPieceY = fallingPieceY-1;

        if ((fallingPieceY < 0) || (this.collisioned(piece, fallingPieceX, fallingPieceY))){
          speed = constants.InitialSpeed; 
          fallingPieceY = fallingPieceY +1;
          
          matchLost = (fallingPieceY + piece.getHeight() > constants.HeightBoard); 
          if (matchLost) {
            this.restartGame();
          }
          else {
            
            let squaresPiece = piece.getSquares().map(function(square) {
              return ({posX: Math.floor(square%constants.SizePiece)+fallingPieceX, posY: Math.floor(square/constants.SizePiece)+fallingPieceY, aColor: piece.piece.aColor, id: uuidV4()});
            });

            squares = [...this.state.squares, ...squaresPiece];
            piece = new Piece();
            fallingPieceY= constants.HeightBoard;
            fallingPieceX= 0;
          }
        }
      }
      
      if (!matchLost) {
          this.setState({
          matchLost,
          piece: piece,
          fallingPieceY: fallingPieceY,
          fallingPieceX: fallingPieceX,
          speed: speed,
          squares: squares
        });
      }
      
      
      this.detectLine();

      setTimeout(myFunction, this.state.speed);
    }
    var timeout= setTimeout(myFunction, this.state.speed);
  }

  render() {
    const pauseElement = (this.state.pause) ? <div className='pauseMessage'>PAUSE</div>: null; 

    return (
        <div className="container">
          speed: {this.state.speed}
          {pauseElement}
          <Main {...this.state}/>

        </div>
    );
  }
}

export default App;
