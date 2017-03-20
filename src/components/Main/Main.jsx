import React, { Component } from 'react';
import Square from '../Square.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    var pieces = this.props.pieces.map(function(piece){
            return <Square piece={piece}/>
         });
    return (
      <div className="main" style={{ position: 'relative'}}>
        <Square piece={this.props.piece}/>      
        ficha cayendo: <br/>
        <br/>  
        {pieces}
      </div>
    );
  }
}

export default Main;
