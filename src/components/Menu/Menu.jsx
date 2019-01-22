import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

class Menu extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const {renewSession} = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    // const {isAuthenticated} = this.props.auth;

    return (
      <Navbar expand="lg" style={{'backgroundColor': '#e3f2ff'}}>
        <Navbar.Brand>React - Tetris</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => this.goTo('home')}>
              Home
            </Nav.Link>
            <Nav.Link onClick={() => this.goTo('leaderboard')}>
              Leaderboard
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
Menu.propTypes = {
  'history': PropTypes.object,
  'auth': PropTypes.object
};
/* <Nav.Link pullRight>{
              !isAuthenticated() && (
                  <Button
                    variant="primary"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                <Navbar.Text>
                  Signed in as: <Button
                    variant="primary"
                    onClick={this.logout.bind(this)}
                  >
                    Otto
                  </Button>
                </Navbar.Text>
                )
            }
            </Nav.Link> */
export default withRouter(Menu);
