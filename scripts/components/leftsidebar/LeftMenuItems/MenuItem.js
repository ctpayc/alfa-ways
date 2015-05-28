'use strict';

import React from 'react';
import Router from 'react-router';
import MenuActions from '../../../actions/MenuActions';

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

let { PropTypes } = React;

class MenuItem extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      isSelected: false
    };
  }

  handleClick() {
    this.toggleSelected();
    MenuActions[
      this.isSelected() ? 'deSelectItem' : 'selectItem'
    ](this.props.item);
  }

  toggleSelected() {
    this.setState({
      isSelected: !this.state.isSelected
    });
  }

  isSelected() {
    return this.state.isSelected;
  }

  getClassName() {
    return (
      this.isSelected() ? 'selectItem' : ''
    )
  }

  render() {
    return (
      <li className={this.getClassName()} onClick={this.handleClick.bind(this)}>
        {this.props.item.label}
      </li>
    );
  }
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default MenuItem;
