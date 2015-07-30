/**
 * 
 */
'use strict';

import React from 'react';
import Formsy from 'formsy-react';
import { Link, Route, RouteHandler } from 'react-router';
import TripActions from '../../actions/TripActions';
import AutocompleteDrivers from '../autocomplete/AutocompleteDrivers';

var request = require('superagent');
var DateTimePicker = require('react-widgets/lib/DateTimePicker');

class AddTrip extends React.Component {

  constructor(... args) {
    super(... args);
    this.state = {
      isSubmitting: true,
      dateTrip: new Date()
    };
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.addDriver = this.addDriver.bind(this);
  }

  onSubmit(data) {
    // TripActions.createTrip(data);
    console.log(data);
    // var datetoIsoString = data.dateinput.toISOString();
    // console.log(datetoIsoString);
  }

  addDriver() {
    console.log('_______________addDriver_______________');
  }

  changeDate(date) {
    alert(date);
    this.setState({dateTrip: date});
  }

  enableButton() {
    this.setState({isSubmitting: true});
  }

  disableButton() {
    this.setState({isSubmitting: false});
  }

  render() {
    // var DateTimePicker = ReactWidgets.DateTimePicker;
    var date = this.state.dateTrip;

    return (
      <div className={'col-md-4'}>
        <Formsy.Form onSubmit={this.onSubmit} onValid={this.enableButton} className="form-addtrip">
          <MyOwnInputAutocomplete name="driver" title="Driver" validations="minLength:5" validationError="Выберите существующего водитея" required />
          <MyOwnInput name="from" title="From" validations="minLength:3" validationError="Введите правильную локацию" required />
          <MyOwnInput name="to" title="To" validations="minLength:3" validationError="Введите правильную локацию" required />
          <MyOwnInputDate type="date" name="departureDay" title="When" validationError="Необходимо указать корректную дату" required />
          <MyOwnInput type="textarea" name="description" title="Description" validations="minLength:1" validationError="Введите краткое описание (комментарий)" required />
          <button type="submit" disabled={!this.state.isSubmitting}>Submit</button>
        </Formsy.Form>
      </div>
    );
  }
}

var MyOwnInputAutocomplete = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changedriver: function () {
    console.log('_______________changedriver_______________');
    console.log(this.refs.driver.state.driverId);
    this.setValue(this.refs.driver.state.driverId);
  },
  fire: function() {
    console.log('_______________fire_______________');
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
        <div className={'AutocompleteDrivers'} onKeyUp={this.changedriver} >
          <AutocompleteDrivers ref="driver" />
        </div>
        {errorIcon}
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

var MyOwnInputDate = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  changeDate: function (date) {
    this.setValue(date);
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
    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.getErrorMessage();

    return (
      <div className={'row'}>
        <div className={'col-md-6'}>
          <div className={divClassName}>
            <label htmlFor={this.props.name}>{this.props.title}</label>
            <DateTimePicker name={this.props.name} defaultValue={new Date()} onChange={this.changeDate} timeFormat="HH:mm" editFormat={"d"} format={"MMM dd yyyy HH:mm"}/>
            {/*<input type={this.props.type || 'text'} name={this.props.name} onChange={this.changeValue} value={this.getValue()} className={'form-control'} />*/}
            {errorIcon}
            <span className='validation-error'>{errorMessage}</span>
          </div>
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