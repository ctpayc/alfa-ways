/**
 * 
 */
'use strict';

import React from 'react';
import Formsy from 'formsy-react';
import { Link, Route, RouteHandler, Redirect, Navigation } from 'react-router';
import TripActions from '../../actions/TripActions';
import TripsStore from '../../stores/TripsStore';
import Loader from 'halogen/MoonLoader';

var ErrorNotice = require('../common/ErrorNotice.react.js');
var MessageNotice = require('../common/MessageNotice.react.js');

var request = require('superagent');
var DateTimePicker = require('react-widgets/lib/DateTimePicker');

import DriversStore from '../../stores/DriversStore';
import DriverActions from '../../actions/DriverActions';
var vow = require('vow');
var Select = require('react-widgets/lib/Combobox');

Formsy.addValidationRule('isMoreThan', function (values, value, minValue) {
  return Number(value) != Number(minValue);
});

var EditTrip = React.createClass ({

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      tripId: this.props.params.tripId,
      driverId: this.props.params.driverId,
      isSubmitting: true,
      stateUpdate: false,
      isLoading: true,
      trip: {},
      driver: {},
      messages: []
    };
  },

  componentWillMount: function() {
    TripActions.loadTrip(this.state.tripId);
  },
  componentDidMount: function() {
    TripsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    TripsStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({trip: TripsStore.getTrip(this.state.tripId), messages: TripsStore.getMessages(), isLoading: false});
    // var self = this;
    // this.setState({messages: TripsStore.getMessages(), stateAdding: true, newTripId: TripsStore.getCreatedTripId()});
    // setTimeout(function () {
    //   self.context.router.transitionTo('currenttrip', {tripId: TripsStore.getCreatedTripId()});
    // }, 3000);
  },

  onSubmit: function(data) {
    console.log('_____________________data_________________');
    console.log(data);
    this.setState({stateUpdate: true, isLoading: true});
    TripActions.updateTrip(data);
  },

  enableButton: function() {
    this.setState({isSubmitting: true});
  },

  disableButton: function() {
    this.setState({isSubmitting: false});
  },

  render: function() {
    if (this.state.isLoading === true) {
      var style = {
            maxWidth: '5%',
            maxHeight: '10%',
            margin: '50px auto'
        };
      var spinner = <div style={style}><Loader color="#666666" /></div>;
      return (
        <div>
          {spinner}
        </div>
      );
    } if (this.state.stateUpdate === true) {
      var messages = <MessageNotice messages={this.state.messages}/>;
      return (
        <div>
          {messages}
        </div>
      );
    } else {
      console.log('_____________________this.state.trip.driver_________________');
      console.log(this.state.trip.driver);
      return (
        <div>
          <h2 className={'text-uppercase'}>Редактирование</h2>
          <div className={'col-md-4'}>
            <Formsy.Form onSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-addtrip">
              <MyOwnInput type="hidden" name="trip" value={this.state.trip.id} validations="isMoreThan:0" showError required />
              <MyOwnInputAutocompleteDriver name="driver" title="Водитель" defValue={this.state.trip.driver} validations="isMoreThan:0" validationError="Выберите существующего водитея" required />
              <MyOwnInput name="from" title="Откуда" validations="isMoreThan:0" value={this.state.trip.from_location_id} validationError="Введите правильную локацию" required />
              <MyOwnInput name="to" title="Куда" validations="isMoreThan:0" value={this.state.trip.to_location_id} validationError="Введите правильную локацию" required />
              <div className={'row'}>
                <MyOwnInputDate type="date" name="departureDay" title="Дата отправления" defValue={this.state.trip.departure} validationError="Необходимо указать корректную дату" required />
                <MyOwnInputTime type="date" name="departureTime" title="Время отправления" defValue={this.state.trip.departure} required />
              </div>
              <MyOwnInputTextArea type="textarea" name="description" title="Описание" value={this.state.trip.description} validations="minLength:1" validationError="Введите краткое описание (комментарий)" required />
              <div className={'blockButton'}>
                <button type="submit" disabled={!this.state.isSubmitting} className={'btn btn-info'}>СОХРАНИТЬ</button>
                <button type="submit" disabled={!this.state.isSubmitting} className={'btn btn-default'}>ОТМЕНА</button>
              </div>
            </Formsy.Form>
          </div>
        </div>
      );
    }
  }
});

var MyOwnInputAutocompleteDriver = React.createClass ({

  mixins: [Formsy.Mixin],

  getInitialStates: function() {
    return {
      options: [],
      isLoading: false,
      defDriver: null,
      errors: []
    }
  },

  componentWillMount: function() {
    var defId = this.props.defValue.id;
    var defLabel = this.props.defValue.name;
    this.setState({options: [{id: defId, label: defLabel}], defDriver: defId});
    this.updateValue(this.props.defValue);
  },

  componentDidMount: function() {
    DriversStore.addChangeListener(this._onChange);
    console.log('_____________________options_________________');
    console.log(this.state.options);
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
    });
    // console.log('_____________________options render_________________');
    // console.log(this.state.options[0].id);
    return (
      <div className={divClassName}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <Select
          placeholder='Введите ФИО водителя'
          defaultValue={this.state.defDriver}
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
  getInitialStates: function() {
    return {
      defDate: null
    }
  },
  componentWillMount: function() {
    this.setState({defDate: new Date(this.props.defValue)});
    this.changeDate(new Date(this.props.defValue));
  },
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
    var errorMessage = this.getErrorMessage();
    return (
      <div className={'col-md-6'}>
        <div className={divClassName}>
          <label htmlFor={this.props.name}>{this.props.title}</label>
          <DateTimePicker name={this.props.name} defaultValue={this.state.defDate} min={new Date()} onChange={this.changeDate} editFormat={"d.MM.yyyy"} format={"MMM dd yyyy"} time={false}/>
          {errorIcon}
          <span className='validation-error'>{errorMessage}</span>
        </div>
      </div>
    );
  }
});
var MyOwnInputTime = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialStates: function() {
    return {
      defDate: null
    }
  },
  componentWillMount: function() {
    this.setState({defDate: new Date(this.props.defValue)});
    this.changeDate(new Date(this.props.defValue));
  },
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  changeDate: function (date) {
    this.setValue(date.toLocaleTimeString());
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
          <DateTimePicker name={this.props.name} defaultValue={this.state.defDate} onChange={this.changeDate} timeFormat="HH:mm" format={"HH:mm"} calendar={false}/>
          {errorIcon}
          <span className='validation-error'>{errorMessage}</span>
        </div>
      </div>
    );
  }
});
var MyOwnInputTextArea = React.createClass({

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
        <textarea type={this.props.type || 'text'} name={this.props.name} onChange={this.changeValue} value={this.getValue()} className={'form-control'} rows={'5'} />
        {errorIcon}
        <span className='validation-error'>{errorMessage}</span>
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
    if (this.props.type == 'hidden') {
      var divClassName = 'hiddeninput';
    }
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

EditTrip.defaultProps = {};

export default EditTrip;