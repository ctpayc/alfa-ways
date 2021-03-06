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

class SelectContainer extends React.Component {
  render(){
    return (
      <div className={'col-md-4'}>
      <h1>Test Autocomplete</h1>
      <div onKeyUp={this.props.inputChange}>{this.props.children}</div>
      </div>)
  }
}

class AutocompleteTest extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      options: DriversStore.getAllDrivers(),
      errors: []
    }
    this.inputChange = this.inputChange.bind(this);
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
    this.setState({options: DriversStore.getAllDrivers()});
  }

   inputChange(){
    var inp = this.refs.inputvalue.state.inputValue;
    console.log('inputChange! input = ' + inp);
    if (inp.length > 2) {
      DriverActions.searchDrivers(inp);
    }
  }

  updateValue(newVal) {
    console.log('updateValue !!!====' + newVal);
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
          name="repolist"
          value={this.props.val}
          options={this.state.options}
          optionRenderer={this.renderOption}
          ignoreCase={true}
          onChange={this.updateValue}
          className="remote-example" />
      </SelectContainer>
    );
  }
}

AutocompleteTest.defaultProps = {val: "Filter Modules..."};

export default AutocompleteTest;