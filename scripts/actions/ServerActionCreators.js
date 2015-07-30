var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  receiveLogin: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveTrips: function(json) {
    // console.log('ServerActionCreators__receiveTrips... json = ' + json);
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TRIPS,
      json: json
    });
  },

  receiveTrip: function(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TRIP,
      json: json
    });
  },

  receiveDrivers: function(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_DRIVERS,
      json: json
    });
  },

  receiveDriverSearch: function(json) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_SEARCH_DRIVER,
      json: json
    });
  },
  
  receiveCreatedTrip: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_TRIP,
      json: json,
      errors: errors
    });
  }
  
};