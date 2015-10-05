var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/DriversWebApiUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  loadDrivers: function() {
    // console.log('DriverActions__loadDrivers');
    WebAPIUtils.loadDrivers();
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_DRIVERS
    });
  },

  searchDrivers: function(data) {
    // console.log('DriverActions__searchDrivers ... query = ' + data);
    AppDispatcher.handleViewAction({
      type: ActionTypes.SEARCH_DRIVERS
    });
    WebAPIUtils.searchDrivers(data);
  },
  
  loadDriver: function(DriverId) {
    // console.log('DriverActions__loadTrip');
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_DRIVER,
      DriverId: DriverId
    });
    WebAPIUtils.loadDriver(DriverId);
  },

  createDriver: function(data) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_DRIVER,
      data: data
    });
    WebAPIUtils.createDriver(data);
  }
};
