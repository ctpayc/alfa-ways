/**
 * 
 */
'use strict';

import React from 'react';
import Formsy from 'formsy-react';
import { Link, Route, RouteHandler, Redirect, Navigation } from 'react-router';
import TripActions from '../../actions/TripActions';
import TripsStore from '../../stores/TripsStore';
import AuthStore from '../../stores/AuthStore';
import MyOwnInput from '../autocomplete/MyOwnInput';
import MyOwnInputAutocompleteDriver from '../autocomplete/MyOwnInputAutocompleteDriver';
import MyOwnInputAutocompleteLocation from '../autocomplete/MyOwnInputAutocompleteLocation';

var ErrorNotice = require('../common/ErrorNotice.react.js');
var MessageNotice = require('../common/MessageNotice.react.js');

var request = require('superagent');
var DateTimePicker = require('react-widgets/lib/DateTimePicker');

Formsy.addValidationRule('isMoreThan', function (values, value, minValue) {
  return Number(value) != Number(minValue);
  // if (value === undefined) {
  //   return true;
  // } else {
  //   return false;
  // }
});

var AddTrip = React.createClass ({

  contextTypes: {
    router: React.PropTypes.func
  },
  statics: {
    willTransitionTo: function (transition) {
      if (!AuthStore.isLoggedIn()) {
        transition.redirect('login');
      }
    }
  },

  getInitialState: function() {
    return {
      isSubmitting: true,
      stateAdding: false,
      newTripId: null,
      messages: []
      // isLoggedIn: AuthStore.isLoggedIn()
    };
  },

  componentWillMount: function() {
    // Handler.transitionTo('login');
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
    // console.log(data);
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
        <div className={'addTripBlock'}>
          <h2 className={'text-uppercase'}>Добавить поездку</h2>
          <div className={'col-md-4'}>
            <Formsy.Form onSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-addtrip">
              <MyOwnInputAutocompleteDriver name="driver" title="Водитель"  validations="minLength:4" validationError="Выберите существующего водитея" required />
              <MyOwnInputAutocompleteLocation name="from" title="Откуда"  validations="isMoreThan:0" validationError="Введите правильную локацию" required />
              <MyOwnInputAutocompleteLocation name="to" title="Куда" validations="isMoreThan:0" validationError="Введите правильную локацию" required />
              <div className={'row'}>
                <MyOwnInputDate type="date" name="departureDay" title="Дата отправления" validationError="Необходимо указать корректную дату" required />
                <MyOwnInputTime type="date" name="departureTime" title="Время отправления" required />
              </div>
              <MyOwnInputTextArea type="textarea" name="description" title="Описание" />
              <div className={'blockButton'}>
                <button type="submit" disabled={!this.state.isSubmitting} className={'btn btn-success'}>СОХРАНИТЬ</button>
                <Link to="trips" className={'btn btn-default'}>ОТМЕНА</Link>
              </div>
            </Formsy.Form>
          </div>
        </div>
      );
    }
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
          <DateTimePicker name={this.props.name} defaultValue={null} onChange={this.changeDate} timeFormat="HH:mm" format={"HH:mm"} calendar={false}/>
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
        <textarea type={this.props.type || 'text'} name={this.props.name} onChange={this.changeValue} value={this.getValue()} className={'form-control'} rows={'5'}/>
        {errorIcon}
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

AddTrip.defaultProps = {};

export default AddTrip;