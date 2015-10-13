import keyMirror from 'react/lib/keyMirror';

// var APIRoot = "http://192.168.182.184:4000";
// var APIRoot = "http://192.168.1.240:4000";
var APIRoot = "http://laraveltest";

module.exports = {

  APIEndpoints: {
    LOGIN:           APIRoot + "/api/v1/login",
    REGISTRATION:    APIRoot + "/api/v1/signup",
    Trips:           APIRoot + "/api/v1/get/trips",
    Trip:            APIRoot + "/api/v1/get/trips",
    AddTrip:         APIRoot + "/api/v1/addtrip",
    UpdateTrip:      APIRoot + "/api/v1/updatetrip",
    DeleteTrip:      APIRoot + "/api/v1/deletetrip",
    Drivers:         APIRoot + "/api/v1/get/drivers",
    searchDrivers:   APIRoot + "/api/v1/search-driver",
    Loactions:       APIRoot + "/api/v1/get/locations",
    searchLocations: APIRoot + "/api/v1/search-location"
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
    UPDATE_TRIP: null,
    DELETE_TRIP: null,
    RECEIVE_CREATED_TRIP: null,
    RECEIVE_UPDATED_TRIP: null,
    RECEIVE_MESSAGE: null,

    LOAD_DRIVERS: null,
    SEARCH_DRIVERS: null,
    RECEIVE_DRIVERS: null,
    LOAD_DRIVER: null,
    RECEIVE_DRIVER: null,
    CREATE_DRIVER: null,
    RECEIVE_CREATED_DRIVER: null,
    RECEIVE_SEARCH_DRIVER: null,

    LOAD_LOCATIONS: null,
    SEARCH_LOCATIONS: null,
    RECEIVE_LOCATIONS: null,
    LOAD_LOCATION: null,
    RECEIVE_LOCATION: null,
    CREATE_LOCATION: null,
    RECEIVE_CREATED_LOCATION: null,
    RECEIVE_SEARCH_LOCATION: null
  })

};