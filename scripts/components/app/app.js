/**
 * 
 */

"use strict";
import React from 'react';
import Router from 'react-router';
import Trips from '../trips/trips';
import LeftNavbar from '../leftsidebar/leftnavbar';
import TopNavbar from '../leftsidebar/topnavbar';
import LeftMenuAjax from '../leftsidebar/LeftMenuAjax';
import MenuActions from '../../actions/MenuActions';
import AuthStore from '../../stores/AuthStore';

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

export default class App extends React.Component {

  constructor(... args) {
    super(... args);
    this.state = {
      loadContent: false,
      isLoggedIn: AuthStore.isLoggedIn(),
      email: AuthStore.getEmail()
    };
    console.log(this.state);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
  }

  componentWillMount() {
    AuthStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState({isLoggedIn: AuthStore.isLoggedIn(),
      email: AuthStore.getEmail()});
  }

  render() {
      return (
        <div className="App">
          <TopNavbar 
            isLoggedIn={this.state.isLoggedIn}
            email={this.state.email} />
          <div className="container-fluid">
            {/* <div className="col-md-2">
              <LeftNavbar item1="MainLeftMenu" />
              <LeftMenuAjax title="TITLE prop left menu ajax"/>
            </div> */ }
            {/* this is the important part */}
            <RouteHandler {...this.props} />
          </div>
        </div>
      );
  }

}

export default App;