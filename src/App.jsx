import React, { Component } from 'react';

// Components.
import Main from './components/Main/Main';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fallingPieceX: 10,
      fallingPieceY: 50
    };
  }

  render() {
    return (
      <Main {...this.state} />
    );
  }
}

export default App;
