/**
 * 
 */
'use strict';

import React from 'react';
import Formsy from 'formsy-react';
import DriversStore from '../../stores/DriversStore';
import DriverActions from '../../actions/DriverActions';
import { Link, Route, RouteHandler } from 'react-router';

var request = require('superagent');
var vow = require('vow');

var Select = require('react-widgets/lib/Multiselect');

class AutocompleteTest extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      options: DriversStore.getAllDrivers(),
      loadingOptions: false,
      newValue: "Filter Modules...",
      isLoading: false,
      errors: []
    }
    this.inputChange = this.inputChange.bind(this);
    this._onChange = this._onChange.bind(this);
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

  inputChange(inp){
    // var inp = this.refs.inputvalue.state.inputValue;
    if (inp.length > 2 && inp !== '') {
      this.inputChangeDebounced(name).then(function (result) {
        DriverActions.searchDrivers(inp);
      });
    }
  }

  render() {
    var ListItem = React.createClass({
      render() {
        var person = this.props.item;
        return (
          <div>
            <strong>{ person.label }</strong>
            <p><span>{person.post} | {person.place}</span></p>
          </div>);
      }
    })
    return (
      <Select 
        defaultValue={[]}
        valueField='id'
        textField='label'
        data={this.state.options}
        onSearch={this.inputChange}
        busy={true}
        filter='contains'
        itemComponent={ListItem} />
    );
  }
}

AutocompleteTest.defaultProps = {};

export default AutocompleteTest;