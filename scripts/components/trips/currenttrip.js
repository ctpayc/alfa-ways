/**
 * 
 */
'use strict';

import React from 'react';
import TripsStore from '../../stores/TripsStore';
import TripActions from '../../actions/TripActions';
import { Link, Route, RouteHandler } from 'react-router';

var ErrorNotice = require('../common/ErrorNotice.react.js');

class Currenttrip extends React.Component {

  constructor(... args) {
    super(... args);
    this.state = {
      trip: TripsStore.getTrip(),
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
    console.log('currenttrip__componentDidMount');
    TripsStore.addChangeListener(this.onChange);
    TripActions.loadTrip(this.props.params.tripId);
  }

  componentWillUnmount() {
    TripsStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      trip: TripsStore.getTrip(),
      errors: TripsStore.getErrors()
    });
  }

  render () {
    
    var tripId = this.props.params.tripId;
    var queryTab = this.props.query.tab;
    // console.log(tripId);
    // console.log(queryTab);
    return (
      <div className="Task">
        <h1>Trip id: {tripId}</h1>
        <h2>Время отправления: {this.state.trip.departure}</h2>
        <h2>Время прибытия: {this.state.trip.arrival}</h2>
        <h2>Description: {this.state.trip.description}</h2>
        {queryTab}
      </div>
    );
  }

}

Currenttrip.contextTypes = {
  router: React.PropTypes.func
};

export default Currenttrip;