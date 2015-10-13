import React from 'react';
import Formsy from 'formsy-react';
import LocationsStore from '../../stores/LocationsStore';
import LocationActions from '../../actions/LocationActions';

var ErrorNotice = require('../common/ErrorNotice.react.js');
var MessageNotice = require('../common/MessageNotice.react.js');

var vow = require('vow');
var Select = require('react-widgets/lib/Combobox');

var MyOwnInputAutocompleteLocation = React.createClass ({

  mixins: [Formsy.Mixin],

  getInitialStates: function() {
    return {
      options: [],
      isLoading: false,
      errors: []
    }
  },

  componentDidMount: function() {
    LocationsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LocationsStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({options: LocationsStore.getAllLocations(), isLoading: false});
  },

  updateValue: function(values) {
    this.setValue(values.id);
  },

  inputChangeDebounced2: function(name) {
    var dfd = vow.defer();
    var timerId = this.timerId;
    var self = this;
    if (timerId) {
        clearTimeout(timerId);
    }
    timerId = setTimeout((function (innerName) {
            return function () {
                dfd.resolve(innerName);
            }
        })(name), 1000);
    this.timerId = timerId;
    return dfd.promise();
  },

  inputChange: function(inp){
    if (inp.length > 2 && inp !== '') {
      this.setState({isLoading: true});
      this.inputChangeDebounced2(name).then(function (result) {
        console.log('LocationActions.searchLocations(' + inp + ');');
        LocationActions.searchLocations(inp);
      });
    } else {
      this.setState({options: []});
    }
  },

  render: function() {
    var className = this.props.className + ' ' + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
    if (this.changeValue) {
      var divClassName = 'form-group ' + (this.showError() ? 'has-error has-feedback' : '');
      var errorIcon = (this.showError() ? <span className="glyphicon glyphicon-remove form-control-feedback"></span> : '');
    } else {
      var divClassName = 'form-group';
      var errorIcon = '';
    }
    var errorMessage = this.getErrorMessage();
    var ListItem = React.createClass({
      render() {
        var person = this.props.item;
        if (person.id === 0) {
          return (
            <strong>Не найдено</strong>
          )
        } else {
          return (
            <div>
              <strong>{person.label}</strong>
              <p><span>{person.post} {person.place}</span></p>
            </div>);
        }
      }
    })
    return (
      <div className={divClassName}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <Select
          placeholder='Введите название города'
          defaultValue={null}
          valueField='id'
          textField='label'
          data={this.state.options}
          onChange={this.inputChange}
          busy={this.state.isLoading}
          filter='contains'
          itemComponent={ListItem}
          onSelect={this.updateValue} />
        {errorIcon}
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default MyOwnInputAutocompleteLocation;