'use strict';

import Flux from 'flux';
import AppConstants from '../constants/AppConstants';

var PayloadSources = AppConstants.PayloadSources;

class AppDispatcher extends Flux.Dispatcher {

  handleServerAction(action) {
    console.log('AppDispatcher__handleServerAction... action = ');
    console.log(action);
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  }

  handleViewAction(action) {
    console.log('AppDispatcher__handleViewAction... action = ');
    console.log(action);
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
}

let dispatcher = new AppDispatcher();

export default dispatcher;
