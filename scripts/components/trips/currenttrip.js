/**
 * 
 */
'use strict';

import React from 'react';
import Router from 'react-router';
// var { Route, DefaultRoute, RouteHandler, Link } = Router;

class Currenttrip extends React.Component {

  render () {
    
    var tripId = this.props.params.tripId;
    var queryTab = this.props.query.tab;
    console.log(tripId);
    console.log(queryTab);
    return (
      <div className="Task">
        <h2>Trip id: {tripId}</h2>
        {queryTab}
      </div>
    );
  }

}

Currenttrip.defaultProps = { initialCount: 4 };
Currenttrip.contextTypes = {
  router: React.PropTypes.func
};

export default Currenttrip;