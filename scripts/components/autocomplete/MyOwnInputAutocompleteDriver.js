import React from 'react';
import Formsy from 'formsy-react';
import DriversStore from '../../stores/DriversStore';
import DriverActions from '../../actions/DriverActions';
var vow = require('vow');
var Select = require('react-widgets/lib/Combobox');

var MyOwnInputAutocompleteDriver = React.createClass ({

  mixins: [Formsy.Mixin],

  getInitialStates: function() {
    return {
      options: [],
      isLoading: false,
      errors: []
    }
  },

  componentWillMount: function() {
    if (this.props.defValue != undefined) {
      var defId = this.props.defValue.id;
      var defLabel = this.props.defValue.name;
      this.setState({options: [{id: defId, label: defLabel}], defDriver: defId});
      this.updateValue(this.props.defValue);
    }
  },

  componentDidMount: function() {
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

  // validate: function() {
  //   return false;
  // },

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

  getCustomErrorMessage: function() {
    console.log('showError_______________showError ===== ' + this.showError());
    return this.showError() ? 'error driver...' : 'no this.showError';
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
    // var errorMessage = this.getCustomErrorMessage();
    // console.log('errorMessage_______________errorMessage ===== ' + errorMessage);
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
              <p><span>{person.post} {person.department}</span></p>
            </div>);
        }
      }
    })
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

export default MyOwnInputAutocompleteDriver;