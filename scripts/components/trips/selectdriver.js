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

var AutocompleteTest = React.createClass ({

  getInitialState: function() {
    return {
      options: DriversStore.getAllDrivers(),
      loadingOptions: false,
      newValue: "Filter Modules...",
      errors: []
    };
  },

  componentDidMount: function() {
    console.log('Autocomplete__ComponentDidMount addChangeListener');
    DriverActions.loadDrivers();
    DriversStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DriversStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    console.log('_onChange');
    this.setState({options: DriversStore.getAllDrivers(), loadingOptions: true});
  },

  shouldComponentUpdate: function() {
    return this.state.loadingOptions;
  },

  inputChange: function(){
    console.log(this);
    var inp = this.refs.inputvalue.state.inputValue;
    console.log('inputChange! input = ---' + this.refs.inputvalue.state.inputValue + '---');
    if (inp.length > 2 && inp !== '') {
      console.log("(inp.length > 2 && inp !== '')");
      this.inputChangeDebounced(name).then(function (result) {
        DriverActions.searchDrivers(inp);
      });
    }
  },

  getOptions: function(input, callback) {
    input = input.toLowerCase();
    var rtn = {
      options: [],
      complete: false
    };
    if (input.length > 3) {
      rtn = {
        options: [
          { label: 'AB', value: 'ab' },
          { label: 'ABC', value: 'abc' },
          { label: 'ABCD', value: 'abcd' }
        ],
        complete: true
      };
    } else if (!input.length) {
      rtn.complete = false;
    }

    setTimeout(function() {
      callback(null, rtn);
    }, 500);
  },

  updateValue: function(newVal) {
    console.log(newVal);
    // this.setState({newValue: newVal});
  },

  renderOption: function(option) {
    return (<div>
            <strong>{option.label}</strong>
            <p><span>{option.post} | {option.place}</span></p>
            </div>);

  },
  renderValue: function(option) {
    return <strong style={{ color: option.hex }}>{option.id}</strong>;
  },

  render: function() {
    return (
      <Select
        ref="inputvalue"
        name="repolist"
        value="Filter Modules..."
        asyncOptions={this.getOptions}
        options={this.state.options}
        optionRenderer={this.renderOption}
        onChange={this.updateValue}
        ignoreCase={true}
        clearable={false}
        className="remote-example" />
    );
  }
});

AutocompleteTest.defaultProps = {};

export default AutocompleteTest;