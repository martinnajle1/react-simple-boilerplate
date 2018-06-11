import React, { Component } from 'react';
import keydown from 'react-keydown';
import * as d3 from 'd3';
// Components.
import Piece from './components/Piece/Piece';
import DisplayNextPiece from './components/DisplayNextPiece/DisplayNextPiece';
import Scorer from './components/Scorer/Scorer';
// const uuidV4 = require('uuid/v4');
import Main from './components/Main/Main';
import constants from './constants.js';
import uuidV4 from 'uuid/v4';
const myAudio = new Audio('../sounds/Tetris_theme.ogg');

let myFunction;

var timeout;

@keydown
class App extends Component {
  
  constructor(props) {
    super(props);

    //TETRIS THEME
    myAudio.loop = true;
    //myAudio.play();

    this.state = {
      level: 0,
      score: 0,
      heightMax: 0,
      numberOfLines: 0,
      piece: new Piece(),
      fallingPieceX: 0,
      fallingPieceY: constants.HeightBoard,
      speed: constants.InitialSpeed,
      squares: [],
      matchLost: false,
      pause: false,
      hardFall: false,
      nextPiece: new Piece()
    };
  }

  restartGame() {
    this.setState({
      level: 0, 
      score: 0,
      heightMax: 0,
      numberOfLines: 0,
      matchLost: false,
      piece: new Piece(),
      fallingPieceX: 0,
      fallingPieceY: constants.HeightBoard,
      speed: constants.InitialSpeed,
      squares: [],
      hardFall: false,
      nextPiece: new Piece()
    });
  }

  detectLine() {
    var {squares, numberOfLines, speed, level, heightMax, score} = this.state;
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
        heightMax = heightMax - lines.length;
        var acc = squares.filter(function(square){
            if (!lines.includes(square.posY)) {
                square.posY = square.posY - lines.filter(function(line) {return line < square.posY;}).length;
                return square;
            }
        });
        level = Math.floor(numberOfLines/10);
        score = score + this.getPoints(level, lines.length);
        if (level >= 10) level = 9;
        speed = constants.InitialSpeed - (level * 100);
      this.setState({ squares: acc, speed, numberOfLines, level, heightMax, score}); 
    }
  }

  collisioned(pieceFalling, fallingX, fallingY, heightMax) {
    if (fallingY>heightMax) return false;
    return this.state.squares.some(function(square){
      return pieceFalling.getSquares().some( function(squareFalling) {
        return ( ((fallingX+(squareFalling % constants.SizePiece)) === (square.posX)) &&
         ((fallingY+(Math.floor(squareFalling / constants.SizePiece))) === (square.posY)) );
      });
    });
  }

  getPoints(level, lines) {
    let {hardFall} = this.state;
    let duplicate = hardFall ? 2: 1;
    return duplicate*((level+1)*constants.Weights[lines-1]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pause) {
        d3.selectAll('.square').style('opacity', 0.3);
      }
      else {
        d3.selectAll('.square').style('opacity', 1);
      }
  }

  componentWillReceiveProps( { keydown } ) {

    if ( keydown.event ) {

      let {fallingPieceX, fallingPieceY, speed, piece, pause, heightMax, hardFall} = this.state;

      switch (keydown.event.which) {

        case constants.ARROWLEFT: {
          if (!pause) {
            fallingPieceX = fallingPieceX + 1;
            if ((this.collisioned(piece, fallingPieceX, fallingPieceY, heightMax))) {
              fallingPieceX = fallingPieceX - 1;
            }
            if (fallingPieceX+piece.getSize() === constants.WidthBoard+1) fallingPieceX = fallingPieceX-1;
            this.setState({ fallingPieceX, fallingPieceY, heightMax});
          }  
        }
        break;
        case constants.ARROWRIGHT:  {
          if (!pause) {
              fallingPieceX = fallingPieceX - 1;
              if ((this.collisioned(piece, fallingPieceX, fallingPieceY, heightMax)))
              {
                fallingPieceX = fallingPieceX + 1;
              }
              if (fallingPieceX < 0) fallingPieceX = 0;
              this.setState({ fallingPieceX, fallingPieceY, heightMax});
            }
          }  
          break;
        case constants.ENTER: {
          if (!pause) {
            speed = constants.MaxSpeed;
            hardFall = true;
            clearTimeout(timeout);
            timeout = setTimeout(myFunction, speed);
            this.setState({ speed, hardFall});
            }
          }  
          break;
        case constants.LETTER_P: {
            pause = !pause;
            this.setState({ pause});
          }  
          break;
        case constants.LETTER_R: {
            if (!pause) {
              piece.rotateRight();
              if ((fallingPieceX + piece.getSize()>constants.WidthBoard)||(this.collisioned(piece, fallingPieceX, fallingPieceY, heightMax))){
                piece.rotateLeft();
              }
              this.setState({ fallingPieceX, fallingPieceY, heightMax});
            }
          } 
          break;
        case constants.LETTER_T: {
            if (!pause) {
              piece.rotateLeft();
              if ((fallingPieceX + piece.getSize()>constants.WidthBoard)||(this.collisioned(piece, fallingPieceX, fallingPieceY, heightMax))) {
                piece.rotateRight();
              }
              this.setState({ fallingPieceX, fallingPieceY});
            } 
          }  
          break;
        case constants.LETTER_S: {
          if (!myAudio.paused) {
            myAudio.pause();    
          }
          else {
            myAudio.play();
          } 
        }  
        break;
      }
    }
  }
 
  componentDidMount() {
     
   const speedDown = function(evt){
      if (evt.keyCode === constants.ENTER) {
        let {level} = this.state;
        let levelSpeed = constants.InitialSpeed - (level * 100);
        this.setState({speed:levelSpeed, hardFall: false});
      }
    }
    document.addEventListener('keyup', speedDown.bind(this));

    myFunction = () => {

      let {piece, nextPiece, fallingPieceY, fallingPieceX, speed, squares, matchLost, pause, level, heightMax, score} = this.state;

      if (!pause) {
        fallingPieceY = fallingPieceY-1;

        if (( fallingPieceY < 0 ) || ( this.collisioned(piece, fallingPieceX, fallingPieceY, heightMax) )) {

          speed = constants.InitialSpeed - (level * 100);
          fallingPieceY = fallingPieceY +1;
          
          matchLost = ( fallingPieceY + piece.getHeight() > constants.HeightBoard ); 
          if (matchLost) {
            this.restartGame();
          }
          else {
            heightMax = ( fallingPieceY + piece.getHeight() > heightMax ) ? (fallingPieceY + piece.getHeight()): heightMax;
            let squaresPiece = piece.getSquares().map(function(square) {
              return ({posX: Math.floor(square%constants.SizePiece)+fallingPieceX, posY: Math.floor(square/constants.SizePiece)+fallingPieceY, aColor: piece.piece.aColor, id: uuidV4()});
            });
            squares = [...this.state.squares, ...squaresPiece];
            piece = nextPiece;
            nextPiece = new Piece();
            fallingPieceY= constants.HeightBoard;
            fallingPieceX= 0;
          }
        }
      }
      
      if (!matchLost) {
          this.setState({
          matchLost,
          piece,
          nextPiece,
          level,
          speed,
          fallingPieceY: fallingPieceY,
          fallingPieceX: fallingPieceX,
          squares: squares,
          heightMax,
          score
        });
      }
      //At least should have the width of the board complete to check for a line
      if (this.state.squares.length >= constants.WidthBoard) {
        this.detectLine();
      }

      timeout = setTimeout(myFunction, this.state.speed);

    }
    timeout = setTimeout(myFunction, this.state.speed);

  }

  render() {

    const pauseElement = (this.state.pause) ? <div className='pauseMessage'>PAUSE</div>: null; 
    const {score, level, speed} = this.state;  
    return (
        <div className="container">
          {Scorer({ score, level, speed })}
          { pauseElement }
          <Main {...this.state}/>
          <DisplayNextPiece nextPiece={this.state.nextPiece}/>
        </div>
    );
  }
}

export default App;
