var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/TripsWebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  loadTrips: function() {
    console.log('TripActions__loadTrips');
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_TRIPS
    });
    WebAPIUtils.loadTrips();
  },
  
  loadTrip: function(tripId) {
    console.log('TripActions__loadTrip');
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_TRIP,
      tripId: tripId
    });
    WebAPIUtils.loadTrip(tripId);
  },

  createTrip: function(data) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_TRIP,
      data: data
    });
    WebAPIUtils.createTrip(data);
  },

  updateTrip: function(data) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_TRIP,
      data: data
    });
    WebAPIUtils.updateTrip(data);
  },

  deleteTrip: function(tripId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.DELETE_TRIP,
      tripId: tripId
    });
    WebAPIUtils.deleteTrip(tripId);
  }

};