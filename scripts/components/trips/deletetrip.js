/**
 * 
 */
'use strict';

import React from 'react';
import { Link, Route, RouteHandler, Redirect, Navigation } from 'react-router';
import TripActions from '../../actions/TripActions';
import TripsStore from '../../stores/TripsStore';
import AuthStore from '../../stores/AuthStore';
import Loader from 'halogen/MoonLoader';

var ErrorNotice = require('../common/ErrorNotice.react.js');
var MessageNotice = require('../common/MessageNotice.react.js');

var request = require('superagent');

var vow = require('vow');

var DeleteTrip = React.createClass ({

  contextTypes: {
    router: React.PropTypes.func
  },
  statics: {
    willTransitionTo: function (transition) {
      if (!AuthStore.isLoggedIn()) {
        transition.redirect('login');
      }
    }
  },

  getInitialState: function() {
    return {
      tripId: this.props.params.tripId,
      driverId: this.props.params.driverId,
      isSubmitting: true,
      stateUpdate: false,
      isLoading: true,
      trip: {},
      driver: {},
      messages: []
    };
  },

  componentWillMount: function() {
    // Handler.transitionTo('login');
    
  },

  componentDidMount: function() {
    TripActions.deleteTrip(this.state.tripId);
    TripsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    TripsStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    var self = this;
    this.setState({messages: TripsStore.getMessages(), isLoading:false, stateUpdate: true});
    setTimeout(function () {
      self.context.router.transitionTo('trips');
    }, 3000);
  },

  render: function() {
    if (this.state.isLoading === true) {
      var style = {
            maxWidth: '5%',
            maxHeight: '10%',
            margin: '50px auto'
        };
      var spinner = <div style={style}><Loader color="#666666" /></div>;
      return (
        <div>
          {spinner}
        </div>
      );
    } if (this.state.stateUpdate === true) {
      var messages = <MessageNotice messages={this.state.messages}/>;
      return (
        <div>
          {messages}
        </div>
      );
    } else {
      return (
        <div className={'addTripBlock'}>
          Trip deleted!
        </div>
      );
    }
  }
});

DeleteTrip.defaultProps = {};

export default DeleteTrip;