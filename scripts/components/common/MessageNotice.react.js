'use strict';

var React = require('react');

var MessageNotice = React.createClass({
  render: function() {
    return (
      <div className="alert alert-success margintop" role="alert">
        <ul>
          {this.props.messages.map(function(message, index){
            return <li className="success-notice" key={"success-"+index}>{message}</li>;
          })}
        </ul>
      </div>
      );
  }
});

module.exports = MessageNotice;