/**
 * 
 */
'use strict';

import React from 'react';
import Formsy from 'formsy-react';
import { Link, Route, RouteHandler } from 'react-router';
import TripActions from '../../actions/TripActions';

import Select from 'react-select';
import DriversStore from '../../stores/DriversStore';
import DriverActions from '../../actions/DriverActions';
var vow = require('vow');

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
  }

  onSubmit(data) {
    // TripActions.createTrip(data);
    console.log(data);
    // var datetoIsoString = data.dateinput.toISOString();
    // console.log(datetoIsoString);
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
        <Formsy.Form name="addtrip" onSubmit={this.onSubmit} onValid={this.enableButton} className="form-addtrip">
          <MyOwnInputAutocomplete inputChange={this.inputChange} name="driver" title="Driver" validations="minLength:5" validationError="Выберите существующего водитея" required />
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
        <div className={'AutocompleteDrivers'} onKeyUp={this.props.inputChange} >
          {this.props.children}
        </div>
        {errorIcon}
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

class AutocompleteDrivers extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      options: DriversStore.getAllDrivers(),
      loadingOptions: false,
      newValue: "Введите ФИО водителя...",
      isLoading: false,
      driverId: null,
      errors: []
    }
    this.inputChange = this.inputChange.bind(this);
    this._onChange = this._onChange.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  componentDidMount() {
    DriverActions.loadDrivers();
    DriversStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    DriversStore.removeChangeListener(this._onChange);
  }

  _onChange(){
    this.setState({options: DriversStore.getAllDrivers()});
  }

  updateValue(newVal, option) {
    if (option.length = 1) {
      var currentDriverId = option[0].id;
    } else {
      var currentDriverId = 0;
    }
    this.setState({newValue: newVal, driverId: currentDriverId});
    // console.log('AutocompleteDrivers____onChange... = ' + newVal);
    // console.log(this);
    // var inp = this.refs.inputvalue.state.id;
  }

  inputChangeDebounced(name) {
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
  }

  inputChange(event){
    var inp = this.refs.inputvalue.state.inputValue;

    if (event.keyCode != 13 || event.keyCode != 27 || event.keyCode != 38 || event.keyCode != 40 || event.keyCode != 9) {
      console.log('_____________________event keyCode ==============' + event.keyCode)
      if (inp.length > 2 && inp !== '') {
        this.inputChangeDebounced(name).then(function (result) {
          DriverActions.searchDrivers(inp);
        });
      }
    }
  }

  renderOption(option) {
    return (<div>
            <strong>{option.label}</strong>
            <p><span>{option.post} | {option.place}</span></p>
            </div>);
  }

  renderValue(option) {
    return <strong style={{ color: option.hex }}>{option.id}</strong>;
  }

  render() {
    return (
      <MyOwnInputAutocomplete name="driver" title="Driver" inputChange={this.inputChange}>
        <Select
          ref="inputvalue"
          name="drivers"
          value={this.state.newValue}
          options={this.state.options}
          optionRenderer={this.renderOption}
          valueRenderer={this.renderValue}
          onChange={this.updateValue}
          ignoreCase={true}
          clearable={false}
          isLoadingSnipper={this.state.isLoading}
          className="remote-example" />
      </MyOwnInputAutocomplete>
    );
  }
}


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