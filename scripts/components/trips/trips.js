/**
 * 
 */
'use strict';

import React from 'react';
import TripsStore from '../../stores/TripsStore';
import TripActions from '../../actions/TripActions';
import TripsList from './TripsList';
import { Link, Route, RouteHandler } from 'react-router';

var ErrorNotice = require('../common/ErrorNotice.react.js');


let { PropTypes } = React;

function getAllItems() {
  console.log('getAllItems');
  TripsStore.getAllTrips();
}

class Trips extends React.Component {

  constructor(... args) {
    super(... args);
    this.state = {
      trips: TripsStore.getAllTrips(),
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    console.log(this.state);
  }

  componentWillMount() {
    // getAllItems();
    // TripActions.loadTrips();
  }

  componentDidMount() {
    console.log('trips__componentDidMount');
    TripsStore.addChangeListener(this.onChange);
    TripActions.loadTrips();
    localStorage.setItem('testkey', 'testitem');
  }

  componentWillUnmount() {
    TripsStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({trips: TripsStore.getAllTrips()});
  }
  render() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
        <TripsList trips={this.state.trips} />
        {/* <li><Link to="currenttrip" params={{tripId: "123"}} query={{tab: "tab1"}}>trip 123</Link></li>
        <li><Link to="currenttrip" params={{tripId: "abc"}} query={{tab: "queryTabInLink"}}>trip abc</Link></li> */}
      </div>
    );
  }
}

Trips.defaultProps = { initialCount: 4 };

export default Trips;