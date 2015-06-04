/**
 * 
 */
'use strict';

import React from 'react';
import { Link, Route, RouteHandler } from 'react-router';

class AddTrip extends React.Component {
 
  render() {
    return (
      <div>
        <form>
          <label>From</label>
          <input name="from" placeholder="from" />
          <label>To</label>
          <input name="to" placeholder="To" />
        </form>
      </div>
    );
  }
}

AddTrip.defaultProps = { initialCount: 4 };

export default AddTrip;