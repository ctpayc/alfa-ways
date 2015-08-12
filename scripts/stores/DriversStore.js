'use strict';

// import BaseStore from './BaseStore';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _drivers = [
        /*{ id: 1, label: 'Иванов Антон Дмитриевич', value: 'иванов антон дмитриевич', post: "старший инженер", place: "ОО 'Кемеровский'" },
        { id: 2, label: 'Ланин Максим Юрьевич', value: 'ланин максим юрьевич', post: "ведущий инженер", place: "ОО 'Омский'" },
        { id: 3, label: 'Осокин Роман Сергеевич', value: 'осокин роман сергеевич', post: "инженер", place: "ОО 'Томский'" },
        { id: 4, label: 'Чунрев Роман Викторович', value: 'чунарев роман викторович', post: "инженер", place: "ОО 'Челяба'" },
        { id: 5,label: 'Киприянов Павел Игоревич', value: 'киприянов павел игоревич', post: "начальник отдела", place: "ОО 'Кемеровский'" }*/
        ];
var _errors = {};
var _driver = { id: "", label: "",value: "", post: "", place: ""};

class DriversStore extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAllDrivers() {
    return _drivers;
  }

  getDriver() {
    return _driver;
  }

  getErrors() {
    return _errors;
  }

}

let store = new DriversStore();

store.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action;
  // console.log('driversStore__AppDispatcher.register action = ');
  // console.log(action);
  switch(action.type) {
    case ActionTypes.RECEIVE_DRIVERS:
      // _drivers = {drivers: 'driversStore__AppDispatcher.register'};
      console.log('driversStore__AppDispatcher.register ActionTypes.RECEIVE_driverS... drivers = ');
      _drivers = action.json;
      console.log(_drivers);
      store.emitChange();
      break;

    case ActionTypes.RECEIVE_SEARCH_DRIVER:
      // _drivers = {drivers: 'driversStore__AppDispatcher.register'};
      console.log('driversStore__AppDispatcher.register ActionTypes.RECEIVE_SEARCH_DRIVER... drivers = ');
      _drivers = action.json;
      console.log(_drivers);
      store.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_DRIVER:
      if (action.json) {
        _driver.unshift(action.json.driver);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      store.emitChange();
      break;

    case ActionTypes.RECEIVE_DRIVER:
      // console.log('driversStore__AppDispatcher.register ActionTypes.RECEIVE_driver... driver = ');
      // console.log(_driver);
      if (action.json) {
        // console.log('driversStore__AppDispatcher.register ActionTypes.RECEIVE_driver... action good, driver = ');
        _driver = action.json.driver;
        _errors = [];
        _driver = action.json;
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
