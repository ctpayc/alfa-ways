/**
 * 
 */
'use strict';

import React from 'react';
import { Link, Route, RouteHandler, Redirect, Navigation } from 'react-router';
import Formsy from 'formsy-react';
import Loader from 'halogen/MoonLoader';
var LoginActions = require('../../actions/LoginActions.js');
var AuthStore = require('../../stores/AuthStore.js');
var ErrorNotice = require('../common/ErrorNotice.react.js');
var MessageNotice = require('../common/MessageNotice.react.js');

var Login = React.createClass ({

  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      errors: [],
      isSubmitting: true,
      messages: [],
      isLoggedIn: AuthStore.isLoggedIn(),
      isBusy: false
    };
  },

  componentWillMount: function() {
    if (this.state.isLoggedIn) {
      this.setState({messages: ['You are already logged in!']});
    }
  },
  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  _onChange: function(event) {
    var self = this;
    this.setState({ errors: AuthStore.getErrors(), isLoggedIn: AuthStore.isLoggedIn(), isBusy: false});
    if (this.state.errors.length == 0) {
      this.setState({messages: ['Logged in successfully!']});
      setTimeout(function () {
        self.context.router.transitionTo('/');
      }, 3000);
    }
  },

  _onSubmit: function(data) {
    this.setState({ errors: [] , isBusy: true});
    LoginActions.login(data.email, data.password);
  },

  enableButton: function() {
    this.setState({isSubmitting: true});
  },

  disableButton: function() {
    this.setState({isSubmitting: false});
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    var style = {
            maxWidth: '15%',
            maxHeight: '10%',
            margin: '50px auto'
        };
    var spinner = (this.state.isBusy === true) ? <div style={style}><Loader color="#666666" /></div> : <div></div>;
    if (this.state.isLoggedIn === true) {
      var messages = <MessageNotice messages={this.state.messages}/>;
      return (
        <div>
          {messages}
        </div>
      );
    }
    return (
      <div>
        <h2>ВХОД</h2>
        <div className={'col-md-4'}>
          {spinner}
          {errors}
          <Formsy.Form onSubmit={this._onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-signin">
            <MyOwnInput name="email" title="Email" validations="isEmail" validationError="Введите правильный электронный адрес" required />
            <MyOwnInput name="password" title="Password" type="password" required />
            <button type="submit" className={'btn btn-success'} disabled={!this.state.isSubmitting}>Войти</button>
          </Formsy.Form>
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

export default Login;