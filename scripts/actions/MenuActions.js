'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import WebAPI from '../utils/WebAPI';

import {
  ITEM_SELECTED,
  ITEM_DESELECTED,
  ITEMS_GET_SUCCESS,
  ITEMS_GET_ERROR
} from '../constants/MenuItemsConstants';

export default {

  selectItem(item) {
    AppDispatcher.dispatch({
      actionType: ITEM_SELECTED,
      item: item
    });
  },

  deSelectItem(item) {
    AppDispatcher.dispatch({
      actionType: ITEM_DESELECTED,
      item: item
    });
  },

  getItems() {
    WebAPI.getItems()
    .then((items) => {
      AppDispatcher.dispatch({
        actionType: ITEMS_GET_SUCCESS,
        items: items
      });
    })
    .catch(() => {
      AppDispatcher.dispatch({
        actionType: ITEMS_GET_ERROR
      });
    });
  }
};
