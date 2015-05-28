'use strict';

import React from 'react';
import MenuItem from './MenuItem';

let { PropTypes } = React;

class LeftMenuList extends React.Component {

  getMenuItem(item) {
    return (
      <MenuItem
        item={item}
        key={'menu-item-' + item.id} />
    );
  }

  render() {
    return (
      <ul className={'menu'}>
        {this.props.items.map(this.getMenuItem, this)}
      </ul>
    );
  }
}

LeftMenuList.propTypes = {
  items: PropTypes.array.isRequired
};

export default LeftMenuList;
