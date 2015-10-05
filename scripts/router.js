'use strict';

let router;

// Create a proxy router for require()ing from other modules
// The trick is to assign module.exports before any require()s

export default {
  getCurrentPath() {
    return router.getCurrentPath();
  },

  makePath(to, params, query) {
    return router.makePath(to, params, query);
  },

  makeHref(to, params, query) {
    return router.makeHref(to, params, query);
  },

  transitionTo(to, params, query) {
    router.transitionTo(to, params, query);
  },

  replaceWith(to, params, query) {
    router.replaceWith(to, params, query);
  },

  goBack() {
    router.goBack();
  },

  run(render) {
    router.run(render);
  }
};

import { create as createRouter, HistoryLocation, HashLocation } from 'react-router';
import routes from './routes';

export default createRouter({
  location: process.env.NODE_ENV === 'production' ? HashLocation : HistoryLocation,
  routes: routes
});