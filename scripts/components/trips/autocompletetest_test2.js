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

function logChange(value) {
  console.log('Select value changed: ' + value);
}
function loadDrivers(data) {
    DriverActions.searchDrivers(data);
}

var RemoteSelectField = React.createClass({

  getInitialState: function() {
    return {
      options: [],
      complete: false
    }
  },

  loadOptions: function(input, callback) {
    input = input.toLowerCase();
    var rtn = {
      options: [],
      complete: true
    };
    console.log('LOADOPTION - state.complete = ' + this.state.complete);
    if (!input.length) {
      rtn.complete = false;
    } else {
      if (input.length > 3) {
        DriverActions.searchDrivers(input);
        // loadDrivers(input);
        rtn.complete = false;
        console.log('LOADOPTION - state.complete = ' + this.state.complete);
        // var opts = DriversStore.getAllDrivers();
        rtn = {
          options: [
          { label: 'Иванов Антон Дмитриевич', value: 'иванов антон дмитриевич' },
          { label: 'Ланин Максим Юрьевич', value: 'ланин максим юрьевич' },
          { label: 'Осокин Роман Сергеевич', value: 'осокин роман сергеевич' },
          { label: 'Чунрев Роман Викторович', value: 'чунарев роман викторович' },
          { label: 'Киприянов Павел Игоревич', value: 'киприянов павел игоревич' }
        ],
        // options: opts,
        complete: true
        }
      }
    }
    console.log('rtn = ');
    console.log(rtn);

    setTimeout(function() {
      callback(null, rtn);
    }, 100);
  },

  componentDidMount: function() {
    console.log('Autocomplete__ComponentDidMount addChangeListener');
    DriversStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DriversStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
      console.log('_onChange addChangeListener or removeChangeListener');
      this.setState({options: DriversStore.getAllDrivers(), complete: true});
      console.log('this.state.complete = ' + this.state.complete);
      console.log('this.state.options = ');
      console.log(this.state.options);
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

  checkValue: function(data) {
    console.log('onChange ...');
    console.log(data);
  },

  render: function() {
    return (
      <div>
        <label>{this.props.label}</label>
        <Select
          asyncOptions={this.loadOptions}
          optionRenderer={this.renderOption}
          ignoreCase={true}
          className="remote-example"
          onChange = {this.checkValue}
          onBlur = {this.checkValue} />
      </div>
    );
  }
});

class AutocompleteTest extends React.Component {

  constructor(... args) {
    super(... args);
    this.state = {
    };
  }

  render() {
    return (
      <div className={'col-md-4'}>
        <h1>Test Autocomplete</h1>
        <RemoteSelectField label="Remote Options:" />
      </div>
    );
  }
}

AutocompleteTest.defaultProps = {};

export default AutocompleteTest;