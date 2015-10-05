
import React from 'react';
import { Link, Route, RouteHandler } from 'react-router';

var ErrorNotice = require('../common/ErrorNotice.react.js');

let { PropTypes } = React;

var Test = React.createClass ({
  render: function() {
    return (
      <div>
        <h2>Test</h2>
      </div>
    );
  }
});

export default Test;