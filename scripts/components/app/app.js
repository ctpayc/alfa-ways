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

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

export default class App extends React.Component {

  constructor(... args) {
    super(... args);
    this.state = {
      loadContent: false
    };
    // console.log(this.state);
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    // this.setState({loadContent: true});
  }

  render() {
      return (
        <div className="App">
          <TopNavbar />
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