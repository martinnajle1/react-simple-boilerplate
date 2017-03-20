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
        fallingPieceX: 10,
        fallingPieceY: 280,
        aColor: colors[Math.floor(Math.random() * colors.length)]
      },     
      speed: 100,
      pieces: []
    };
  }
  
  
  componentWillReceiveProps( { keydown } ) {
    if ( keydown.event ) {

      let {piece:{fallingPieceX}, speed} = this.state;

     if (keydown.event.which == 39) {
        fallingPieceX = fallingPieceX + 20;
        if (fallingPieceX > 180) fallingPieceX = 180;
     }

     if (keydown.event.which == 37) {
        fallingPieceX = fallingPieceX - 20;
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
 
  collisioned () {
    return (Math.random() < 0.1);
  }

  componentDidMount() {
    var myFunction = () => {
      
      let {piece: activePiece, speed, pieces, aColor} = this.state;
      
      activePiece.fallingPieceY = activePiece.fallingPieceY -10;

      if ((activePiece.fallingPieceY < 0)|| (this.collisioned())){
        speed = 100; 
        activePiece.fallingPieceY = activePiece.fallingPieceY+10;
        pieces = [...this.state.pieces, activePiece];
        activePiece = {
          fallingPieceX: 0,
          fallingPieceY: 280,
          aColor: colors[Math.floor(Math.random() * colors.length)]
        };
      }

      this.setState({
        piece: activePiece,
        speed: speed,
        pieces: pieces
      });

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
