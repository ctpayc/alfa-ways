/**
 * 
 */
'use strict';

import React from 'react';
import { Link, Route, RouteHandler } from 'react-router';
import Formsy from 'formsy-react';

import Loader from 'halogen/MoonLoader';
var LoginActions = require('../../actions/LoginActions.js');
var AuthStore = require('../../stores/AuthStore.js');
var ErrorNotice = require('../common/ErrorNotice.react.js');

let { PropTypes } = React;

class Login extends React.Component {

  constructor(... args) {
    super(... args);
    this.state = {
      errors: [],
      isSubmitting: true,
    };
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    console.log('login.js state........');
    console.log(this.state);
  }

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({ errors: AuthStore.getErrors() });
  }

  _onSubmit(data) {
    console.log(data);
    this.setState({ errors: [] });
    LoginActions.login(data.email, data.password);
  }
  enableButton() {
    this.setState({isSubmitting: true});
  }

  disableButton() {
    this.setState({isSubmitting: false});
  }

  render() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div className={'col-md-4'}>
        {errors}
        <Formsy.Form onSubmit={this._onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-signin">
          <MyOwnInput name="email" title="Email" validations="isEmail" validationError="Введите правильный электронный адрес" required />
          <MyOwnInput name="password" title="Password" type="password" required />
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

export default Login;