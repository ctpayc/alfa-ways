/**
 * 
 */
'use strict';

import React from 'react';
import TripsStore from '../../stores/TripsStore';
import TripActions from '../../actions/TripActions';
import TripsList from './TripsList';
import { Link, Route, RouteHandler } from 'react-router';
import Loader from 'halogen/MoonLoader';

var ErrorNotice = require('../common/ErrorNotice.react.js');

let { PropTypes } = React;

class Trips extends React.Component {

  constructor(... args) {
    super(... args);
    this.state = {
      trips: TripsStore.getAllTrips(),
      loadContent: false,
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    console.log(this.state);
  }

  componentWillMount() {

  }

  componentDidMount() {
    TripActions.loadTrips();
    TripsStore.addChangeListener(this.onChange);
    localStorage.setItem('testkey', 'testitem');
  }

  componentWillUnmount() {
    TripsStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({trips: TripsStore.getAllTrips(), loadContent: true});
  }

  render() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    var style = {
            maxWidth: '5%',
            maxHeight: '10%',
            margin: 'auto'
        };
    var spinner = (this.state.loadContent === false) ? <div style={style}><Loader color="#666666" /></div> : <TripsList trips={this.state.trips} />;
    return (
      <div>
        {spinner}
        {errors}
        {/* <li><Link to="currenttrip" params={{tripId: "123"}} query={{tab: "tab1"}}>trip 123</Link></li>
        <li><Link to="currenttrip" params={{tripId: "abc"}} query={{tab: "queryTabInLink"}}>trip abc</Link></li> */}
      </div>
    );
  }
}

Trips.defaultProps = { initialCount: 4 };

export default Trips;