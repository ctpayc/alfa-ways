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

  loadLocations: function() {
    console.log('LocationsWebUtils__loadLocations (APIEndpoints.Locations) = ' + APIEndpoints.Locations);
    request.get(APIEndpoints.Locations)
      // .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          // console.log('LocationsWebUtils__loadLocations (json) = ');
          // console.log(json);
          ServerActionCreators.receiveLocations(json);
        }
      });
  },

  searchLocations: function(data) {
    console.log('LocationsWebUtils__searchLocations (APIEndpoints.Locations) = ' + APIEndpoints.searchLocations + '/' + data);
    request.get(APIEndpoints.searchLocations + '/' + data)
      // .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          // console.log('LocationsWebUtils__searchLocations (json) = ');
          // console.log(json);
          ServerActionCreators.receiveLocationSearch(json);
        }
      });
  },

  loadLocation: function(LocationId) {
    request.get(APIEndpoints.Locations + '/' + LocationId)
      .set('Accept', 'application/json')
      // .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          ServerActionCreators.receiveLocation(json);
          console.log('LocationsWebUtils__loadLocation (json) = ');
          console.log(json);
        }
      });
  },

  createLocation: function(data) {
    request.post(APIEndpoints.AddLocation)
    .set('Accept', 'application/json')
    .type('json')
    .send({"description":data.description, "user_id": data.Location, "from": data.from, "to": data.to, "departure": data.departure})
    .end(function(error, res){
      // console.log('addLocation callback; data.from');
      if(error) {
        console.log('error!!! ');
        console.log(error);
      }
      if(res) {
        console.log(res);
        if (res.error) {
          // console.log(res);
          var errorMsgs = _getErrors(res);
          // ServerActionCreators.receiveCreatedLocation(null, errorMsgs);
          // console.log(errorMsgs);
        } else {
          var json = JSON.parse(res.text);
          // console.log(res.text);
        }
      }
    });
  }
};
