import React, { Component } from 'react';

// Components.
import Main from './components/Main/Main';
import keydown, { Keys } from 'react-keydown';
const colors = ['lightsalmon', 'antiquewhite', 'lightseagreen', 'aqua',
'lightskyblue','aquamarine','lightslategray',,'azure','lightsteelblue'];

@keydown
class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      piece: {
        fallingPieceX: 4,
        fallingPieceY: 20,
        aColor: colors[Math.floor(Math.random() * colors.length)]
      },     
      speed: 100,
      pieces: []
    };
  }
  
  detectLine() {
    var {pieces} = this.state;
    var lines = pieces.reduce(function(acc, val){
    if (acc[val.fallingPieceY]) acc[val.fallingPieceY]++
    else acc[val.fallingPieceY] = 1;
    return acc;
    }, [])
    .reduce(function(acc, line, index){
      if (line === 9) acc.push(index); 
      return acc;
    }, []);
    if (lines.length > 0) {
      debugger;
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
      
      this.state.pieces = total; 
      this.setState(this.state);
    }
  }

  componentWillReceiveProps( { keydown } ) {
    if ( keydown.event ) {

      let {piece:{fallingPieceX, fallingPieceY}, speed} = this.state;

     if (keydown.event.which == 39) {
        fallingPieceX = fallingPieceX + 1;
        if ((this.collisioned({fallingPieceX, fallingPieceY})))
        {
          fallingPieceX = fallingPieceX - 1;
        }
        if (fallingPieceX > 8) fallingPieceX = 8;
     }

     if (keydown.event.which == 37) {
        fallingPieceX = fallingPieceX - 1;
        if ((this.collisioned({fallingPieceX, fallingPieceY})))
        {
          fallingPieceX = fallingPieceX + 1;
        }

        if (fallingPieceX < 0) fallingPieceX = 0;
     }

     if (keydown.event.which == 13) {
        speed = 10;
     }

     this.state.piece.fallingPieceX = fallingPieceX;
     this.state.speed = speed;
     this.setState(this.state);
    }
  }
 
  collisioned ({fallingPieceX, fallingPieceY}) {
    return this.state.pieces.some(function(piece){
       return ((piece.fallingPieceX === fallingPieceX) &&
                (piece.fallingPieceY === fallingPieceY))
    });
  }


  componentDidMount() {
    var myFunction = () => {
      
      let {piece: activePiece, speed, pieces, aColor} = this.state;
      
      activePiece.fallingPieceY = activePiece.fallingPieceY-1;

      if ((activePiece.fallingPieceY < 0)|| (this.collisioned(activePiece))){
        speed = 100; 
        activePiece.fallingPieceY = activePiece.fallingPieceY+1;
        pieces = [...this.state.pieces, activePiece];
        activePiece = {
          fallingPieceX: 4,
          fallingPieceY: 20,
          aColor: colors[Math.floor(Math.random() * colors.length)]
        };
      }

      this.setState({
        piece: activePiece,
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
        <div>
          speed: {this.state.speed}
          <Main {...this.state}/>
        </div>
    );
  }
}

export default App;
