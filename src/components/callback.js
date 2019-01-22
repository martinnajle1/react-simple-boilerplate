// src/Callback/Callback.js
import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

function Callback(props) {
  props.auth.handleAuthentication().then(() => {
    props.history.push('/');
  });

  return (
    <div>
      Loading user profile.
    </div>
  );
}
Callback.propTypes = {
  'auth': PropTypes.object,
  'history': PropTypes.object
};
export default withRouter(Callback);
