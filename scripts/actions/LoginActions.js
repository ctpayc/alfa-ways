var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/AuthWebApiUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  signup: function(email, name, post, place, password, passwordConfirmation) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      name: name,
      post: post,
      place: place,
      password: password,
      passwordConfirmation: passwordConfirmation
    });
    WebAPIUtils.signup(email, name, post, place, password, passwordConfirmation);
  },

  login: function(username, password) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      username: username,
      password: password
    });
    WebAPIUtils.login(username, password);
  },

  logout: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }

};