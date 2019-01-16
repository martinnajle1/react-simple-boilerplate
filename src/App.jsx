import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';


import Game from './pages/Game/Game.jsx';
import Ranking from './pages/Ranking/Ranking.jsx';
class App extends Component {

  render() {
    return (
      <BrowserRouter>
            <div className="container">
              <Switch>
                <Route exact path="/scores" component={Ranking} />
                <Route exact path="/" exact component={Game} />
              </Switch>
            </div>
          </BrowserRouter>
    );
  }
}

export default App;