import React, { Component } from 'react';
import keydown, { Keys } from 'react-keydown';
// Components.
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
      piece: this.getRandomPiece(),
      fallingPieceX: Math.floor(Math.random() * (constants.Width)),
      fallingPieceY: constants.Height,
      speed: constants.InitialSpeed,
      pieces: []
    };
  }
  getRandomPiece() {
    return constants.Pieces[Math.floor(Math.random()*constants.Pieces.length)];
  }

  detectLine() {
    var {pieces} = this.state;
    var lines = pieces.reduce(function(acc, val){
    if (acc[val.fallingPieceY]) acc[val.fallingPieceY]++
    else acc[val.fallingPieceY] = 1;
    return acc;
    }, [])
    .reduce(function(acc, line, index){
      if (line === constants.Width) acc.push(index); 
      return acc;
    }, []);
    if (lines.length > 0) {
      let total = [];
      lines.forEach(function(line) {
        let acc = pieces.filter(function(piece){
          if (piece.fallingPieceY !== line){
            if (piece.fallingPieceY > line) {
               piece.fallingPieceY--;
            }
            return piece;
          }
        });
        total = total.concat(acc);
      });
      
      this.setState({ pieces: total });
    }
  }

  collisioned ({fallingPieceX, fallingPieceY}) {
    return this.state.pieces.some(function(piece){
       return ((piece.fallingPieceX === fallingPieceX) &&
                (piece.fallingPieceY === fallingPieceY))
    });
  }

  getColorRandom() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  componentWillReceiveProps( { keydown } ) {
    if ( keydown.event ) {

    let {fallingPieceX, fallingPieceY, speed, piece} = this.state;

    if (keydown.event.which === constants.ArrowLeft) {
        fallingPieceX = fallingPieceX + 1;
        if ((this.collisioned({fallingPieceX, fallingPieceY})))
        {
          fallingPieceX = fallingPieceX - 1;
        }
        if (fallingPieceX+piece.size === constants.Width+1) fallingPieceX = fallingPieceX-1;
    }

    if (keydown.event.which === constants.ArrowRight) {
        fallingPieceX = fallingPieceX - 1;
        if ((this.collisioned({fallingPieceX, fallingPieceY})))
        {
          fallingPieceX = fallingPieceX + 1;
        }

        if (fallingPieceX-piece.size < 0) fallingPieceX = 0;
    }

     if (keydown.event.which == constants.Enter) {
        speed = 10;
     }

     this.setState({ fallingPieceX, fallingPieceY, speed });
    }
  }
 
  componentDidMount() {
    const myFunction = () => {
      
      let {piece, fallingPieceY, fallingPieceX, speed, pieces, aColor} = this.state;
      fallingPieceY = fallingPieceY-1;

      if ((fallingPieceY < 0)/*|| (this.collisioned())*/){
        speed = constants.InitialSpeed; 
        piece.id = uuidV4();// Generate a v4 UUID (random) 
        debugger;
        fallingPieceY = fallingPieceY+1;
        pieces = [...this.state.pieces, {piece: piece, posX:fallingPieceX, posY:fallingPieceY }];
        
        fallingPieceX = 4;
        piece = this.getRandomPiece();
        fallingPieceY= 20;
        fallingPieceX= fallingPieceX;
      }

      this.setState({
        piece: piece,
        fallingPieceY: fallingPieceY,
        fallingPieceX: fallingPieceX,
        speed: speed,
        pieces: pieces
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
