module.exports = {

  loadOptions: function(data) {
      console.log('GetOptionsHelper_loadOptions (options) = ' + data);
      setTimeout(function() {
        callback(null, data);
      }, 100);
    }

};