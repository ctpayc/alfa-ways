'use strict';

import React from 'react';
import { Route, Redirect, RouteHandler, Link } from 'react-router';
import App from './components/app/app';
import Trips from './components/trips/trips';
import Currenttrip from './components/trips/currenttrip';
import MainTrips from './components/trips/maintrips';
import Page1 from './pages/1page';
import Page2 from './pages/2page';
import Page3 from './pages/3page';
import Page4 from './pages/4page';

export default (
  <Route name='app' path='/' handler={App}>
    <Route name='trips' path='/trips' handler={Trips}>
      <Route name="currenttrip" path=":tripId" handler={Currenttrip}/>
      
    </Route>
    <Route name='page2' path='/2page' handler={Page2} />
    <Route name='LeftMenu' path='/leftmenuitems' handler={Page3} >
      <Route name='LeftMenuItems' path='/leftmenuitems/:itemid' handler={Page4} />
    </Route>
  </Route>
);
