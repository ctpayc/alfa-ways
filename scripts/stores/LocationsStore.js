'use strict';

// import BaseStore from './BaseStore';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _locations = [
        /*{ id: 1, label: 'Иванов Антон Дмитриевич', value: 'иванов антон дмитриевич', post: "старший инженер", place: "ОО 'Кемеровский'" },
        { id: 2, label: 'Ланин Максим Юрьевич', value: 'ланин максим юрьевич', post: "ведущий инженер", place: "ОО 'Омский'" },
        { id: 3, label: 'Осокин Роман Сергеевич', value: 'осокин роман сергеевич', post: "инженер", place: "ОО 'Томский'" },
        { id: 4, label: 'Чунрев Роман Викторович', value: 'чунарев роман викторович', post: "инженер", place: "ОО 'Челяба'" },
        { id: 5,label: 'Киприянов Павел Игоревич', value: 'киприянов павел игоревич', post: "начальник отдела", place: "ОО 'Кемеровский'" }*/
        ];
var _errors = {};
var _location = { id: "", label: "",value: "", post: "", place: ""};

class LocationsStore extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAllLocations() {
    return _locations;
  }

  getLocation() {
    return _location;
  }

  getErrors() {
    return _errors;
  }

}

let store = new LocationsStore();

store.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action;
  // console.log('driversStore__AppDispatcher.register action = ');
  // console.log(action);
  switch(action.type) {
    case ActionTypes.RECEIVE_LOCATIONS:
      // _drivers = {drivers: 'driversStore__AppDispatcher.register'};
      console.log('LocationsStore__AppDispatcher.register ActionTypes.RECEIVE_driverS... drivers = ');
      _locations = action.json;
      console.log(_locations);
      store.emitChange();
      break;

    case ActionTypes.RECEIVE_SEARCH_LOCATION:
      // _drivers = {drivers: 'driversStore__AppDispatcher.register'};
      console.log('LocationsStore__AppDispatcher.register ActionTypes.RECEIVE_SEARCH_DRIVER... drivers = ');
      _locations = action.json;
      console.log(_locations);
      store.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_LOCATION:
      if (action.json) {
        _location.unshift(action.json.location);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      store.emitChange();
      break;

    case ActionTypes.RECEIVE_LOCATIONS:
      // console.log('driversStore__AppDispatcher.register ActionTypes.RECEIVE_driver... driver = ');
      // console.log(_driver);
      if (action.json) {
        // console.log('driversStore__AppDispatcher.register ActionTypes.RECEIVE_driver... action good, driver = ');
        _locations = action.json.location;
        _errors = [];
        _locations = action.json;
        // console.log(_driver);
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
