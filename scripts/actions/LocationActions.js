var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/LocationsWebApiUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  loadLocations: function() {
    // console.log('DriverActions__loadLoactions');
    WebAPIUtils.loadLoactions();
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_LOCATIONS
    });
  },

  searchLocations: function(data) {
    console.log('DriverActions__searchLoactions ... query = ' + data);
    AppDispatcher.handleViewAction({
      type: ActionTypes.SEARCH_LOCATIONS
    });
    WebAPIUtils.searchLocations(data);
  },
  
  loadDLocation: function(DriverId) {
    // console.log('DriverActions__loadTrip');
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_LOCATION,
      DriverId: DriverId
    });
    WebAPIUtils.loadLocatoin(DriverId);
  },

  createLocation: function(data) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_LOCATION,
      data: data
    });
    WebAPIUtils.createLocation(data);
  }
};
