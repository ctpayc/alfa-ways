'use strict';

var request = require('superagent');

export default {

    getOb() {
      return request
        .get('http://laraveltest/api/get/items')
        .end(function(err, res) {
          if (err) {
            console.log(err);
          } else if (res.status === 200) {
            //console.log(JSON.stringify(res.body));
          } else {
            console.log('something wrong @_@');
          }

        });
    },

    postOb() {
      $.get('http://laraveltest/api/get/items', function(result) {
          console.log(result);
      });
      console.log('postOb');
    }
}