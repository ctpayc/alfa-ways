/**
 * 
 */
"use strict";

require('./navbar.scss');

import React from 'react';
import Router from 'react-router';
import LoginActions from '../../actions/LoginActions';

var Link = Router.Link;

class TopNavbar extends React.Component {
  
  logout(e) {
    e.preventDefault();
    LoginActions.logout();
  }

  render() {
    var rightNav = this.props.isLoggedIn ? (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{this.props.email}<span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><a href="#">Мои поездки</a></li>
            <li className="divider"></li>
            <li><a href='#' onClick={this.logout}>Выйти</a></li>
          </ul>
        </li>
      </ul>
    ) : (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="login">Login</Link></li>
        <li><Link to="signup">Sign up</Link></li>
      </ul>
    );
    var addtrip = this.props.isLoggedIn ? (<li><Link to="addtrip">Добавить поездку</Link></li>) : null;
    return (
      <nav className='navbar navbar-default'>
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="app" className="navbar-brand">Main page</Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="trips">Поездки</Link></li>
              <li><Link to="page2">Объявления</Link></li>
              {addtrip}
              <li><Link to="test">test</Link></li>
            </ul>
            {rightNav}
          </div>
        </div>
      </nav>
    );
  }
  zzz() {
    console.log('a');
  }
}

export default TopNavbar;