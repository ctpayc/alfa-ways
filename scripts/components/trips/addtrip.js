/**
 * 
 */
'use strict';

import React from 'react';
import Formsy from 'formsy-react';
import { Link, Route, RouteHandler, Redirect, Navigation } from 'react-router';
import TripActions from '../../actions/TripActions';
import TripsStore from '../../stores/TripsStore';
import AutocompleteDrivers from '../autocomplete/AutocompleteDrivers';

var ErrorNotice = require('../common/ErrorNotice.react.js');
var MessageNotice = require('../common/MessageNotice.react.js');

var request = require('superagent');
var DateTimePicker = require('react-widgets/lib/DateTimePicker');

import DriversStore from '../../stores/DriversStore';
import DriverActions from '../../actions/DriverActions';
var vow = require('vow');
var Select = require('react-widgets/lib/Combobox');

Formsy.addValidationRule('isMoreThan', function (values, value, minValue) {
  return Number(value) > Number(minValue);
});

var AddTrip = React.createClass ({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      isSubmitting: true,
      stateAdding: false,
      newTripId: null,
      messages: []
    };
  },

  componentDidMount: function() {
    TripsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    TripsStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    var self = this;
    this.setState({messages: TripsStore.getMessages(), stateAdding: true, newTripId: TripsStore.getCreatedTripId()});
    setTimeout(function () {
      self.context.router.transitionTo('currenttrip', {tripId: TripsStore.getCreatedTripId()});
    }, 3000);
  },

  onSubmit: function(data) {
    TripActions.createTrip(data);
  },

  enableButton: function() {
    this.setState({isSubmitting: true});
  },

  disableButton: function() {
    this.setState({isSubmitting: false});
  },

  render: function() {
    if (this.state.stateAdding === true) {
      var messages = <MessageNotice messages={this.state.messages}/>;
      return (
        <div>
          {messages}
        </div>
      );
    } else {
      return (
        <div className={'col-md-4'}>
          <Formsy.Form onSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-addtrip">
            <MyOwnInputAutocompleteDriver name="driver" title="Driver"  validations="isMoreThan:0" validationError="Выберите существующего водитея" required />
            <MyOwnInput name="from" title="From" validations="minLength:3" validationError="Введите правильную локацию" required />
            <MyOwnInput name="to" title="To" validations="minLength:3" validationError="Введите правильную локацию" required />
            <div className={'row'}>
              <MyOwnInputDate type="date" name="departureDay" title="Day" validationError="Необходимо указать корректную дату" required />
              <MyOwnInputTime type="date" name="departureTime" title="Time" required />
            </div>
            <MyOwnInput type="textarea" name="description" title="Description" validations="minLength:1" validationError="Введите краткое описание (комментарий)" required />
            <button type="submit" disabled={!this.state.isSubmitting}>Submit</button>
          </Formsy.Form>
        </div>
      );
    }
  }
});

var MyOwnInputAutocompleteDriver = React.createClass ({

  mixins: [Formsy.Mixin],

  getInitialStates: function() {
    return {
      options: DriversStore.getAllDrivers(),
      isLoading: false,
      errors: []
    }
  },

  componentDidMount: function() {
    DriverActions.loadDrivers();
    DriversStore.addChangeListener(this._onChange);

  },

  componentWillUnmount: function() {
    DriversStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({options: DriversStore.getAllDrivers(), isLoading: false});
  },

  updateValue: function(values) {
    this.setValue(values.id);
  },

  inputChangeDebounced: function(name) {
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
      this.inputChangeDebounced(name).then(function (result) {
        DriverActions.searchDrivers(inp);
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
          placeholder='Введите ФИО водителя'
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

var MyOwnInputDate = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  changeDate: function (date) {
    this.setValue(date.toDateString());
  },
  render: function () {
    var className = this.props.className + ' ' + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
    if (this.changeValue) {
      var divClassName = 'form-group ' + (this.showError() ? 'has-error has-feedback' : '');
      var errorIcon = (this.showError() ? <span className="glyphicon glyphicon-remove form-control-feedback"></span> : '');
    } else {
      var divClassName = 'form-group';
      var errorIcon = '';
    }
    var errorMessage = this.getErrorMessage();
    return (
      <div className={'col-md-6'}>
        <div className={divClassName}>
          <label htmlFor={this.props.name}>{this.props.title}</label>
          <DateTimePicker name={this.props.name} defaultValue={null} min={new Date()} onChange={this.changeDate} editFormat={"d.MM.yyyy"} format={"MMM dd yyyy"} time={false}/>
          {errorIcon}
          <span className='validation-error'>{errorMessage}</span>
        </div>
      </div>
    );
  }
});
var MyOwnInputTime = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  changeDate: function (date) {
    this.setValue(date.toTimeString());
  },
  render: function () {
    var className = this.props.className + ' ' + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
    if (this.changeValue) {
      var divClassName = 'form-group ' + (this.showError() ? 'has-error has-feedback' : '');
      var errorIcon = (this.showError() ? <span className="glyphicon glyphicon-remove form-control-feedback"></span> : '');
    } else {
      var divClassName = 'form-group';
      var errorIcon = '';
    }
    var errorMessage = this.getErrorMessage();
    return (
      <div className={'col-md-6'}>
        <div className={divClassName}>
          <label htmlFor={this.props.name}>{this.props.title}</label>
          <DateTimePicker name={this.props.name} defaultValue={null} onChange={this.changeDate} timeFormat="HH:mm" format={"HH:mm"} calendar={false}/>
          {errorIcon}
          <span className='validation-error'>{errorMessage}</span>
        </div>
      </div>
    );
  }
});

var MyOwnInput = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function () {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    var className = this.props.className + ' ' + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);

    if (this.changeValue) {
      var divClassName = 'form-group ' + (this.showError() ? 'has-error has-feedback' : '');
      var errorIcon = (this.showError() ? <span className="glyphicon glyphicon-remove form-control-feedback"></span> : '');
    } else {
      var divClassName = 'form-group';
      var errorIcon = '';
    }
    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.getErrorMessage();

    return (
      <div className={divClassName}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input type={this.props.type || 'text'} name={this.props.name} onChange={this.changeValue} value={this.getValue()} className={'form-control'} />
        {errorIcon}
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

AddTrip.defaultProps = {};

export default AddTrip;