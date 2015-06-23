'use strict';

var request = require('superagent');

export default {

    getOb() {
      request
        .get('http://laraveltest/api/get/trips')
        .end(function(err, res) {
          if (err) {
            console.log(err);
          } else if (res.status === 200) {
            // console.log(JSON.stringify(res.body));
          } else {
            console.log('something wrong @_@');
          }
        });
        return 123;
    },

    postOb() {
      $.get('http://laraveltest/api/get/trips', function(result) {
          console.log(result);
      });
      console.log('postOb');
    }
}