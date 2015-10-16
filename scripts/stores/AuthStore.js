'use strict';

// import BaseStore from './BaseStore';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage
var _accessToken = localStorage.getItem('accessToken');
var _username = localStorage.getItem('username');
var _user_id = localStorage.getItem('user_id');
var _errors = [];

class AuthStore extends EventEmitter {
  
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  isLoggedIn() {
    return _accessToken ? true : false;
  }

  getAccessToken() {
    return _accessToken;
  }

  getUsername() {
    return _username;
  }

  getUserId() {
    return _user_id;
  }

  getErrors() {
    return _errors;
  }

}

let store = new AuthStore();

store.dispatchToken = AppDispatcher.register((payload) => {
  var action = payload.action;
  // console.log('driversStore__AppDispatcher.register action = ');
  // console.log(action);
  switch(action.type) {
    case ActionTypes.LOGIN_RESPONSE:
      console.log('LOGIN_RESPONSE');
      console.log(action.json);
      _errors = [];
      if (action.json && action.json.token) {
        _accessToken = action.json.token;
        _username = action.json.username;
        _user_id = action.json.user_id;
        // Token will always live in the session so that the API can grab it with no hassle
        localStorage.setItem('accessToken', _accessToken);
        localStorage.setItem('username', _username);
        localStorage.setItem('user_id', _user_id);
        if (action.json.errors) {
          _errors.unshift(action.json.errors);
          // _errors = action.json.errors;
        }
      }
      if (action.errors) {
        console.log(action.errors);
        _errors = $.map(action.errors, function(error, index){
          return error;
        });
      }
      store.emitChange();
      break;

    case ActionTypes.LOGOUT:
      _accessToken = null;
      _username = null;
      _user_id = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      localStorage.removeItem('user_id');
      store.emitChange();
      break;
    }
  return true;
});

export default store;
