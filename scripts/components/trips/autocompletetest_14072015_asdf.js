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

class AutocompleteTest extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      options: DriversStore.getAllDrivers(),
      loadingOptions: false,
      newValue: "Filter Modules...",
      errors: []
    }
    this.inputChange = this.inputChange.bind(this);
    this.inputChangeDebounced = this.inputChangeDebounced.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    console.log('Autocomplete__ComponentDidMount addChangeListener');
    DriverActions.loadDrivers();
    DriversStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    DriversStore.removeChangeListener(this._onChange);
  }

  _onChange(){
    console.log('_onChange');
    this.setState({options: DriversStore.getAllDrivers(), loadingOptions: true});
  }

  shouldComponentUpdate() {
    return this.state.loadingOptions;
  }

  inputChangeDebounced(name) {
    var dfd = vow.defer();
    console.log(this);
    consol.log('dfd---------------------------------------------------------dfd');
    console.log(dfd);
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
    console.log(this);
    var inp = this.refs.inputvalue.state.inputValue;
    console.log('inputChange! input = ---' + this.refs.inputvalue.state.inputValue + '---');
    if (inp.length > 2 && inp !== '') {
      console.log("(inp.length > 2 && inp !== '')");
      this.inputChangeDebounced(name).then(function (result) {
        DriverActions.searchDrivers(inp);
      });
    }
  }

  updateValue(newVal) {
    console.log(newVal);
    // this.setState({newValue: newVal});
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
      <Select asyncOptions={this.inputChange} className="remote-example" />
    );
  }
}

AutocompleteTest.defaultProps = {};

export default AutocompleteTest;