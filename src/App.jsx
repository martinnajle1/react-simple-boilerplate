import React, {Component} from 'react';
import {Router} from 'react-router-dom';
import {Route, Switch, Redirect} from 'react-router';

import Game from './pages/Game/Game';
import Menu from './components/Menu/Menu';
import Ranking from './pages/Ranking/Ranking.jsx';
import Auth from './config/Auth';
import history from './config/history';

const auth = new Auth();

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <Menu auth={auth} />
          <div className="container">
            <Switch>
              <Route exact path="/home" exact component={Game} />
              <Route exact path="/leaderboard" component={Ranking} />
              <Route exact path="/callback" render={() => <h1>CALLBACK</h1>} />
              <Redirect from="/" exact to="/home" />
              <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
