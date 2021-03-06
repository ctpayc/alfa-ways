'use strict';


// import BaseStore from './BaseStore';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import GetWebApi from '../utils/GetWebApi';

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _trips = [];
var _errors = {};
var _messages = [];
var _newTripId = null;
var _trip = { id: "", user_id: "", description: "", from_location_id: "", to_location_id: "", start: ""};

class TripsStore extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAllTrips() {
    return _trips;
  }

  getTrip() {
    return _trip;
  }

  getErrors() {
    return _errors;
  }

  getMessages() {
    return _messages;
  }

  getCreatedTripId() {
    return _newTripId;
  }
}

let store = new TripsStore();

store.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action;
  // console.log('TripsStore__AppDispatcher.register action = ');
  // console.log(action);
  switch(action.type) {
    case ActionTypes.RECEIVE_TRIPS:
      // _trips = {trips: 'TripsStore__AppDispatcher.register'};
      // console.log('TripsStore__AppDispatcher.register ActionTypes.RECEIVE_TRIPS... trips = ');
      _trips = action.json;
      // console.log(_trips);
      store.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_TRIP:
      console.log('TripsStore__AppDispatcher.register ActionTypes.RECEIVE_CREATED_TRIP... trip = ');
      console.log(action.json);
      if (action.json) {
        _trips.unshift(action.json.trip);
        _messages = action.json.message;
        _newTripId = action.json.tripId;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      store.emitChange();
      break;

    case ActionTypes.RECEIVE_TRIP:
      if (action.json) {
        _trip = action.json.trip;
        _errors = [];
        _trip = action.json;
      }
      if (action.errors) {
        _errors = action.errors;
      }
      store.emitChange();
      break;

    case ActionTypes.RECEIVE_MESSAGE:
      // console.log('TripsStore__AppDispatcher.register ActionTypes.RECEIVE_TRIP... trip = ');
      // console.log(_trip);
      if (action.json) {
        // console.log('TripsStore__AppDispatcher.register ActionTypes.RECEIVE_TRIP... action good, trip = ');
        _messages = action.json.message;
        // console.log(_trip);
      }
      if (action.errors) {
        _errors = action.errors;
      }
      store.emitChange();
      break;
    }
  return true;
});

export default store;
