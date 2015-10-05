var ServerActionCreators = require('../actions/ServerActionCreators.js');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if (res) {
    var json = JSON.parse(res.text);
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

var APIEndpoints = AppConstants.APIEndpoints;

module.exports = {

  loadDrivers: function() {
    console.log('DriversWebUtils__loadDrivers (APIEndpoints.Drivers) = ' + APIEndpoints.Drivers);
    request.get(APIEndpoints.Drivers)
      // .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          // console.log('DriversWebUtils__loadDrivers (json) = ');
          // console.log(json);
          ServerActionCreators.receiveDrivers(json);
        }
      });
  },

  searchDrivers: function(data) {
    console.log('DriversWebUtils__searchDrivers (APIEndpoints.Drivers) = ' + APIEndpoints.searchDrivers + '/' + data);
    request.get(APIEndpoints.searchDrivers + '/' + data)
      // .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          // console.log('DriversWebUtils__searchDrivers (json) = ');
          // console.log(json);
          ServerActionCreators.receiveDriverSearch(json);
        }
      });
  },

  loadDriver: function(DriverId) {
    request.get(APIEndpoints.Drivers + '/' + DriverId)
      .set('Accept', 'application/json')
      // .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          ServerActionCreators.receiveDriver(json);
          console.log('DriversWebUtils__loadDriver (json) = ');
          console.log(json);
        }
      });
  },

  createDriver: function(data) {
    request.post(APIEndpoints.AddDriver)
    .set('Accept', 'application/json')
    .type('json')
    .send({"description":data.description, "user_id": data.driver, "from": data.from, "to": data.to, "departure": data.departure})
    .end(function(error, res){
      // console.log('addDriver callback; data.from');
      if(error) {
        console.log('error!!! ');
        console.log(error);
      }
      if(res) {
        console.log(res);
        if (res.error) {
          // console.log(res);
          var errorMsgs = _getErrors(res);
          // ServerActionCreators.receiveCreatedDriver(null, errorMsgs);
          // console.log(errorMsgs);
        } else {
          var json = JSON.parse(res.text);
          // console.log(res.text);
        }
      }
    });
  }
};
