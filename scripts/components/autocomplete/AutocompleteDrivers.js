/**
 * 
 */
'use strict';

import React from 'react';
import Formsy from 'formsy-react';
import DriversStore from '../../stores/DriversStore';
import DriverActions from '../../actions/DriverActions';
import Select from 'react-select';
import { Link, Route, RouteHandler } from 'react-router';

var request = require('superagent');
var vow = require('vow');

class SelectContainer extends React.Component {
  render(){
    return (
      <div className={'form-group'}>
        <div onKeyUp={this.props.inputChange}>{this.props.children}</div>
      </div>)
  }
}

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

  inputChange(){
    var inp = this.refs.inputvalue.state.inputValue;
    if (inp.length > 2 && inp !== '') {
      this.inputChangeDebounced(name).then(function (result) {
        DriverActions.searchDrivers(inp);
      });
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
      <SelectContainer inputChange={this.inputChange}>
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
      </SelectContainer>
    );
  }
}

AutocompleteDrivers.defaultProps = {};

export default AutocompleteDrivers;