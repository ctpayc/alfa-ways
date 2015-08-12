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
      driverId: 0,
      options: DriversStore.getAllDrivers(),
      isLoading: false,
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

  componentWillReceiveProps(values) {
    console.log('______________________componentWillReceiveProps______________________');
    console.log(values);
    //this.setState({});
  }

  _onChange(){
    this.setState({options: DriversStore.getAllDrivers(), isLoading: false});
  }

  updateValue(values) {
    this.setState({driverId: values.id});
    console.log('______________________SelectValue______________________');
    console.log(values.id);
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
      this.setState({isLoading: true});
      this.inputChangeDebounced(name).then(function (result) {
        DriverActions.searchDrivers(inp);
      });
    } else {
      this.setState({options: []});
    }
  }

  render() {
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
              <p><span>{person.post} | {person.place}</span></p>
            </div>);
        }
      }
    })
    return (
      <Select 
        placeholder='Введите ФИО водителя'
        defaultValue={null}
        valueField='id'
        textField='label'
        data={this.state.options}
        onSearch={this.inputChange}
        onChange={value => this.setState({ driverId: value[0].id })}
        busy={this.state.isLoading}
        filter='contains'
        itemComponent={ListItem}
        onSelect={this.props.selectDriver} />
    );
  }
}

AutocompleteTest.defaultProps = {};

export default AutocompleteTest;