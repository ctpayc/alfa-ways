/**
 * 
 */
'use strict';

import React from 'react';
import Formsy from 'formsy-react';
import { Link, Route, RouteHandler } from 'react-router';
import TripActions from '../../actions/TripActions';

var request = require('superagent');

class AddTrip extends React.Component {

  constructor(... args) {
    super(... args);
    this.state = {
      isSubmitting: false
    };
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  onSubmit(data) {
    TripActions.createTrip(data);
  }

  enableButton() {
    this.setState({isSubmitting: true});
  }

  disableButton() {
    this.setState({isSubmitting: false});
  }

  render() {
    return (
      <div className={'col-md-4'}>
        <Formsy.Form onSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-addtrip">
          <MyOwnInput name="driver" title="Driver" validations="minLength:3" validationError="Нет такого водителя" required />
          <MyOwnInput name="from" title="From" validations="minLength:3" validationError="Введите правильную локацию" required />
          <MyOwnInput name="to" title="To" validations="minLength:3" validationError="Введите правильную локацию" required />
          <MyOwnInput type="textarea" name="description" title="Description" validations="minLength:1" validationError="Введите краткое описание (комментарий)" required />
          <MyOwnInput name="when" title="When" validations="minLength:5" validationError="Необходимо указать корректную дату" required />
          <button type="submit" disabled={!this.state.isSubmitting}>Submit</button>
        </Formsy.Form>
      </div>
    );
  }
}

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