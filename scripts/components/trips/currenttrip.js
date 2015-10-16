/**
 * 
 */
'use strict';

import React from 'react';
import TripsStore from '../../stores/TripsStore';
import TripActions from '../../actions/TripActions';
import { Link, Route, RouteHandler } from 'react-router';
import Loader from 'halogen/MoonLoader';
import AuthStore from '../../stores/AuthStore';
import Moment from 'moment';
Moment.locale('ru');

var ErrorNotice = require('../common/ErrorNotice.react.js');

var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');

class Currenttrip extends React.Component {

  constructor(... args) {
    super(... args);
    this.state = {
      trip: TripsStore.getTrip(),
      loadContent: false,
      errors: [],
      isLoggedIn: AuthStore.isLoggedIn(),
      showModal: false
    };
    this.onChange = this.onChange.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    console.log(this.state);
  }

  componentWillMount() {
    TripActions.loadTrip(this.props.params.tripId);
    TripsStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    TripsStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      trip: TripsStore.getTrip(),
      loadContent: true,
      errors: TripsStore.getErrors()
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render () {
    console.log('isLoggedIn & user_id');
    console.log(this.state.isLoggedIn);
    console.log(this.state.trip.user_id);
    console.log(AuthStore.getUserId());
    var editButton = (this.state.isLoggedIn === true && this.state.trip.user_id == AuthStore.getUserId()) ? <div><Link to="edittrip" className={'btn btn-info'} params={{tripId: this.props.params.tripId}}>РЕДАКТИРОВАТЬ</Link><a className={'btn btn-danger'} href="#" onClick={this.open}>УДАЛИТЬ</a></div> : <div></div>;
    if (isEmpty(this.state.trip)) {
      this.state.errors.push('no trip');
      errors = <ErrorNotice errors={this.state.errors}/>;
    } else {
      var tripId = this.props.params.tripId;
      var driverName = (this.state.loadContent === true && this.state.trip.driver !== null) ? this.state.trip.driver.name: 'не найден';
      var from_location = (this.state.loadContent === true && this.state.trip.from_location.length > 0) ? 'г. ' + this.state.trip.from_location[0].name + ', ' + this.state.trip.from_location[0].region: 'город не найден';
      var to_location = (this.state.loadContent === true && this.state.trip.to_location.length > 0) ? 'г. ' + this.state.trip.to_location[0].name + ', ' + this.state.trip.to_location[0].region: 'город не найден';
      var style = {
              maxWidth: '5%',
              maxHeight: '10%',
              margin: '50px auto'
          };
      var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
      var spinner = (this.state.loadContent === false) ? <div style={style}><Loader color="#26A65B" /></div> : <div>
          <h1>{driverName}</h1>
          <div className={'col-md-12 fulltrip'}>
            <h4>Время отправления: {Moment(this.state.trip.departure).format('LLL')}</h4>
            <h4>Откуда: {from_location}</h4>
            <h4>Куда: {to_location}</h4>
            <h4>Описание: {this.state.trip.description}</h4>
            <h4>Телефон: 8-909-516-20-00</h4>
          </div>
          <div className={'col-md-12 blockButton'}>
            {editButton}
          </div>
          </div>;
    }
    return (
      <div className="Task">
        {spinner}
        {errors}
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Удаление</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Вы действительн хотите удалить поездку?</p>
          </Modal.Body>
          <Modal.Footer>
            <Link to="deletetrip" className={'btn btn-danger'} params={{tripId: this.props.params.tripId}}>Удалить</Link>
            <Button onClick={this.close}>Отмена</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

Currenttrip.contextTypes = {
  router: React.PropTypes.func
};

export default Currenttrip;