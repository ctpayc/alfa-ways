/**
 * 
 */

"use strict";

require('./test.scss');

import React from 'react';
import { Link, Route, RouteHandler } from 'react-router';
import Trips from '../trips/trips';
import LeftNavbar from '../leftsidebar/leftnavbar';
import TopNavbar from '../leftsidebar/topnavbar';
import LeftMenuAjax from '../leftsidebar/LeftMenuAjax';
import MenuActions from '../../actions/MenuActions';
import AuthStore from '../../stores/AuthStore';

let { PropTypes } = React;

export default class App extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      loadContent: false,
      isLoggedIn: AuthStore.isLoggedIn(),
      username: AuthStore.getUsername()
    };
    console.log(this.state);
    this._onChange = this._onChange.bind(this);
  }
  // static contextTypes = {
  //   router: PropTypes.func.isRequired
  // };

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
  }

  componentWillMount() {
    AuthStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    var loginState = this.state.isLoggedIn;
    console.log(loginState);
    this.setState({
      isLoggedIn: AuthStore.isLoggedIn(),
      username: AuthStore.getUsername()
    });
    console.log(this.state.isLoggedIn);
    if (loginState === false && this.state.isLoggedIn === true) {
      // this.context.router.replaceWith('/');
    }
  }

  render() {
      return (
        <div className="App">
          <TopNavbar 
            isLoggedIn={this.state.isLoggedIn}
            username={this.state.username} />
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

App.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default App;