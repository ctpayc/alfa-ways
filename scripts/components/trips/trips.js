/**
 * 
 */
'use strict';

import React from 'react';
import { Link, Route, RouteHandler } from 'react-router';

class Trips extends React.Component {
 
  render() {
    return (
      <div>
        <ul>
          <li><Link to="currenttrip" params={{tripId: "123"}} query={{tab: "tab1"}}>trip 123</Link></li>
          <li><Link to="currenttrip" params={{tripId: "abc"}}>trip abc</Link></li>
        </ul>
        
      </div>
    );
  }
}

Trips.defaultProps = { initialCount: 4 };

export default Trips;