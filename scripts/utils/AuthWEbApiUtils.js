var ServerActionCreators = require('../actions/ServerActionCreators.js');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  var json = JSON.parse(res.text);
  console.log('AuthWebApiUtils _______ json errors');
  console.log(json);
  if (json) {
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

  signup: function(email, name, post, place, password, passwordConfirmation) {
    console.log('AuthWebApiUtils signup __________________');
    request.post(APIEndpoints.REGISTRATION)
      .send({ 
        email: email, 
        name: name,
        post: post,
        place: place,
        password: password,
        password_confirmation: passwordConfirmation
      })
      .set('Accept', 'application/json')
      .end(function(error, res) {
        console.log('reg response __________________');
        if (res) {
          if (res.error) {
            console.log(res);
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            var json = JSON.parse(res.text);
            console.log(json);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  login: function(username, password) {
    request.post(APIEndpoints.LOGIN)
      .send({ username: username, password: password, grant_type: 'password' })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            ServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            console.log(res);
            var json = JSON.parse(res.text);
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  }
}