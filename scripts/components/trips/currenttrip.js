/**
 * 
 */
'use strict';

import React from 'react';
import TripsStore from '../../stores/TripsStore';
import TripActions from '../../actions/TripActions';
import { Link, Route, RouteHandler } from 'react-router';
import Loader from 'halogen/MoonLoader';

var ErrorNotice = require('../common/ErrorNotice.react.js');

class Currenttrip extends React.Component {

  constructor(... args) {
    super(... args);
    this.state = {
      trip: TripsStore.getTrip(),
      loadContent: false,
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
    TripActions.loadTrip(this.props.params.tripId);
    TripsStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    TripsStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      trip: TripsStore.getTrip(),
      loadContent: true,
      errors: TripsStore.getErrors()
    });
  }

  render () {
    if (isEmpty(this.state.trip)) {
      this.state.errors.push('no trip');
      errors = <ErrorNotice errors={this.state.errors}/>;
    } else {
      var tripId = this.props.params.tripId;
      var queryTab = this.props.query.tab;
      var style = {
              maxWidth: '5%',
              maxHeight: '10%',
              margin: 'auto'
          };
      var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
      var spinner = (this.state.loadContent === false) ? <div style={style}><Loader color="#26A65B" /></div> : <div>
          <h1>Trip id: {tripId}</h1>
          <h2>Время отправления: {this.state.trip.departure}</h2>
          <h2>Время прибытия: {this.state.trip.arrival}</h2>
          <h2>Description: {this.state.trip.description}</h2>
          {queryTab}
          </div>;
    }
    return (
      <div className="Task">
        {spinner}
        {errors}
      </div>
    );
  }

}

var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

Currenttrip.contextTypes = {
  router: React.PropTypes.func
};

export default Currenttrip;