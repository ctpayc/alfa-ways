/**
 * 
 */
'use strict';

import React from 'react';
import LeftMenuList from './LeftMenuItems/LeftMenuList';
import MenuItemsStore from '../../stores/MenuItemsStore';
import MenuActions from '../../actions/MenuActions';

let { PropTypes } = React;

function getAllItems() {
  console.log('getAllItems');
  MenuItemsStore.getAll();
}

class LeftMenuAjax extends React.Component {

  constructor(... args) {
    super(... args);
    this.state = MenuItemsStore.getAll();
  }

  componentWillMount() {
    // getAllItems();
  }

  componentDidMount() {
    MenuItemsStore.addChangeListener(this.onChange);
    localStorage.setItem('testkey', 'testitem');
    MenuActions.getItems();
  }

  componentWillUnmount() {
    MenuItemsStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getAllItems());
  }

  render() {
    return (
      <div>
        {this.props.title}
        <LeftMenuList items={this.state.items} />
      </div>
    );
  }
}

export default LeftMenuAjax;