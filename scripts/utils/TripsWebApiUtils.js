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

  loadTrips: function() {
    console.log('TripsWebUtils__loadTrips (APIEndpoints.Trips) = ' + APIEndpoints.Trips);
    request.get(APIEndpoints.Trips)
      .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
      // .set('zzz', "sss")
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          console.log('TripsWebUtils__loadTrips (json) = ');
          console.log(json);
          ServerActionCreators.receiveTrips(json);
        }
      });
  },

  loadTrip: function(tripId) {
    request.get(APIEndpoints.Trip + '/' + tripId)
      .set('Accept', 'application/json')
      // .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          ServerActionCreators.receiveTrip(json);
          console.log('TripsWebUtils__loadTrip (json) = ');
          console.log(json);
        }
      });
  },

  createTrip: function(data) {
    request.post(APIEndpoints.AddTrip)
    .set('Accept', 'application/json')
    .type('json')
    .send({"description":data.description, "user_id": localStorage.getItem('user_id'), "driver_id": data.driver, "from": data.from, "to": data.to, "departureDay": data.departureDay, "departureTime": data.departureTime})
    .end(function(error, res){
      if(error) {
        console.log('error!!! ');
        console.log(error);
      }
      if(res) {
        if (res.error) {
          var errorMsgs = _getErrors(res);
          ServerActionCreators.receiveCreatedTrip(null, errorMsgs);
        } else {
          var json = JSON.parse(res.text);
          console.log('TripsWebUtils__createTrip___________');
          console.log(json);
          ServerActionCreators.receiveCreatedTrip(json, null);
        }
      }
    });
  },

  updateTrip: function(data) {
    request.post(APIEndpoints.UpdateTrip + '/' + data.trip)
    .set('Accept', 'application/json')
    .type('json')
    .send({"description":data.description, "user_id": localStorage.getItem('user_id'), "driver_id": data.driver, "from": data.from, "to": data.to, "departureDay": data.departureDay, "departureTime": data.departureTime})
    .end(function(error, res){
      if(error) {
        console.log('error!!! ');
        console.log(error);
      }
      if(res) {
        if (res.error) {
          var errorMsgs = _getErrors(res);
          ServerActionCreators.receiveCreatedTrip(null, errorMsgs);
        } else {
          var json = JSON.parse(res.text);
          console.log('TripsWebUtils__createTrip___________');
          console.log(json);
          ServerActionCreators.receiveCreatedTrip(json, null);
        }
      }
    });
  },

  deleteTrip: function(tripId) {
    request.post(APIEndpoints.DeleteTrip + '/' + tripId)
    .set('Accept', 'application/json')
    .type('json')
    .end(function(error, res){
      if(error) {
        console.log('error!!! ');
        console.log(error);
      }
      if(res) {
        if (res.error) {
          var errorMsgs = _getErrors(res);
          ServerActionCreators.receiveMessage(null, errorMsgs);
        } else {
          var json = JSON.parse(res.text);
          console.log('TripsWebUtils__deleteTrip___________');
          console.log(json);
          ServerActionCreators.receiveMessage(json, null);
        }
      }
    });
  }

};