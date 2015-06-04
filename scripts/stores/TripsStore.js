'use strict';


// import BaseStore from './BaseStore';
import { EventEmitter } from 'events';
import MenuActions from '../actions/MenuActions';
import AppDispatcher from '../dispatchers/AppDispatcher';
import GetWebApi from '../utils/GetWebApi';

import {
  ITEMS_UPDATED,
  ITEMS_GET_SUCCESS
} from '../constants/MenuItemsConstants';

class MenuItemsStore extends EventEmitter {

  emitChange() {
    this.emit(ITEMS_UPDATED);
  }

  addChangeListener(callback) {
    this.on(ITEMS_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(ITEMS_UPDATED, callback);
  }

  setAll() {
    return 'set All from MenuItemsStore';
  }

  getAll() {
    // $.get('http://laraveltest/api/get/items', function(result) {
    //   console.log(result);
    // });
    var resp;
    // resp = GetWebApi.getOb();
    resp = 10;
    resp = GetWebApi.getOb();
    console.log(resp);
    // for (var i = 0; i < 3; i++) {
    //   console.log(resp);
    // }
    return {
      items: [
        {
          id: 0,
          label: 'item 0'
        },
        {
          id: 1,
          label: 'item 111'
        },
        {
          id: 2,
          label: 'item 223'
        }
      ]
    };
  };
}

let store = new MenuItemsStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
    case ITEMS_GET_SUCCESS:
      store.setAll(action.items);
      break;
    default:
  }
});

export default store;
