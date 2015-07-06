import keyMirror from 'react/lib/keyMirror';

var APIRoot = "http://laraveltest";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/v1/login",
    REGISTRATION:   APIRoot + "/v1/users",
    Trips:          APIRoot + "/api/v1/get/trips",
    Trip:           APIRoot + "/api/v1/get/trips",
    AddTrip:        APIRoot + "/api/v1/addtrip"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,

    // Routes
    REDIRECT: null,

    LOAD_TRIPS: null,
    RECEIVE_TRIPS: null,
    LOAD_TRIP: null,
    RECEIVE_TRIP: null,
    CREATE_TRIP: null,
    RECEIVE_CREATED_TRIP: null
  })

};