var React = require('react');

var ErrorNotice = React.createClass({
  render: function() {
    return (
      <div className="alert alert-danger margintop" role="alert">
        <ul>
          {this.props.errors.map(function(error, index){
            if (Array.isArray(error)) {
              console.log('AAARRRRAAAYYYY');
            }
            return <li className="error-notice__error" key={"error-"+index}>{error}</li>;
          })}
        </ul>
      </div>
      );
  }
});

module.exports = ErrorNotice;