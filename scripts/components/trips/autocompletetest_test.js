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
var STATES = require('./data/states');
var id = 0;

function logChange(value) {
  console.log('Select value changed: ' + value);
}

var CountrySelect = React.createClass({
  onClick: function() {
    this.props.onSelect(this.props.value);
  },
  render: function() {
    var className = this.props.value === this.props.selected ? 'active' : 'link';
    return <span onClick={this.onClick} className={className}>{this.props.children}</span>;
  }
});

var StatesField = React.createClass({
  getDefaultProps: function () {
    return {
      searchable: true,
      label: 'States:'
    };
  },
  getInitialState: function() {
    return {
      country: 'US',
      disabled: false
    };
  },
  updateValue: function(newValue) {
    logChange('State changed to ' + newValue);
    this.setState({
      selectValue: newValue || null
    });
  },
  render: function() {
    var ops = STATES[this.state.country];
    return (
      <div>
        <label>{this.props.label}</label>
        <Select ref="stateSelect" options={ops} disabled={this.state.disabled} value={this.state.selectValue} placeholder="Введите ФИО сотрудника" onChange={this.updateValue} searchable={this.props.searchable} />
      </div>
    );
  }
});

var RemoteSelectField = React.createClass({
  onChange: function() {
    DriversStore.getAllDrivers();
  },

  loadOptions: function(input, callback) {
    input = input.toLowerCase();
    var rtn = {
      options: [],
      complete: true
    };
    if (!input.length) {
      rtn.complete = false;
    } else {
      DriverActions.loadDrivers();
      DriversStore.addChangeListener(this.onChange);
      var opts = DriversStore.getAllDrivers();
      rtn = {
        /*options: [
        { label: 'Иванов Антон Дмитриевич', value: 'иванов антон дмитриевич' },
        { label: 'Ланин Максим Юрьевич', value: 'ланин максим юрьевич' },
        { label: 'Осокин Роман Сергеевич', value: 'осокин роман сергеевич' },
        { label: 'Чунрев Роман Викторович', value: 'чунарев роман викторович' },
        { label: 'Киприянов Павел Игоревич', value: 'киприянов павел игоревич' }
      ],*/
      options: opts,
      complete: true
      }
    }
    console.log('rtn = ');
    console.log(rtn);

    setTimeout(function() {
      callback(null, rtn);
    }, 100);
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
      <div>
        <label>{this.props.label}</label>
        <Select
          asyncOptions={this.loadOptions}
          optionRenderer={this.renderOption}
          ignoreCase={true}
          className="remote-example" />
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

  onSubmit(data) {
    // TripActions.createTrip(data);
    console.log(data);
    // var datetoIsoString = data.dateinput.toISOString();
    // console.log(datetoIsoString);
  }

  render() {
    // var DateTimePicker = ReactWidgets.DateTimePicker;
    var date = this.state.dateTrip;

    return (
      <div className={'col-md-4'}>
        <h1>Test Autocomplete</h1>
        <StatesField />
        <RemoteSelectField label="Remote Options:"/>
      </div>
    );
  }
}

AutocompleteTest.defaultProps = {};

export default AutocompleteTest;