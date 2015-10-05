import React from 'react';
import LoginActions from '../../actions/LoginActions.js';
import AuthStore from '../../stores/AuthStore.js';
import Loader from 'halogen/MoonLoader';

var ErrorNotice = require('../../components/common/ErrorNotice.react.js');
var MessageNotice = require('../common/MessageNotice.react.js');

var Signup = React.createClass ({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      errors: [],
      messages: [],
      isSubmitting: true,
      isLoggedIn: AuthStore.isLoggedIn(),
      isBusy: false
    };
  },
  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    var self = this;
    this.setState({ errors: AuthStore.getErrors(), isLoggedIn: AuthStore.isLoggedIn(), isBusy: false });
    console.log(this.state.isBusy);
    if (this.state.errors.length == 0 && this.state.isLoggedIn == true) {
      this.setState({messages: ['Logged in successfully!']});
      setTimeout(function () {
        self.context.router.transitionTo('/');
      }, 3000);
    }
  },
  _onSubmit: function(data) {
    this.setState({isBusy: true, errors: []});
    console.log(this.state.isBusy);
    LoginActions.signup(data.email, data.name, data.post, data.place, data.password, data.passwordConfirmation);
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
            margin: 'auto'
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
      <div className={'col-md-4'}>
        {spinner}
        {errors}
        {messages}
        <Formsy.Form onSubmit={this._onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-signin">
          <MyOwnInput name="email" title="Email" validations="isEmail" validationError="Введите правильный электронный адрес" required />
          <MyOwnInput name="name" title="ФИО" validations="minLength:3" validationError="ФИО должно быть больше 3 знаков" required />
          <MyOwnInput name="post" title="Должность" validations="minLength:3" validationError="Должность должно быть больше 3 знаков" required />
          <MyOwnInput name="place" title="Отделение" validations="minLength:3" validationError="Введите существующее отделение" required />
          <MyOwnInput name="password" title="Пароль" type="password" required />
          <MyOwnInput name="passwordConfirmation" title="Подтверждение пароля" type="password" validations="equalsField:password" required />
          <button type="submit" disabled={!this.state.isSubmitting}>Submit</button>
        </Formsy.Form>
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

module.exports = Signup;