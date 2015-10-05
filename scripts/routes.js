'use strict';

import React from 'react';
import { Route, Redirect, RouteHandler, Link, NotFoundRoute, DefaultRoute } from 'react-router';
import App from './components/app/app';
import Trips from './components/trips/trips';
import Test from './components/test/Test';
import AddTrip from './components/trips/addtrip';
import EditTrip from './components/trips/edittrip';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Currenttrip from './components/trips/currenttrip';
import MainTrips from './components/trips/maintrips';
import Page1 from './pages/1page';
import Page2 from './pages/2page';
import Page3 from './pages/3page';
import Page4 from './pages/4page';

export default (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute handler={Trips} />
    <Route name='trips' path='trips' handler={Trips}/>
    <Route name='login' path='/login' handler={Login}/>
    <Route name="signup" path="/signup" handler={Signup}/>
    <Route name="currenttrip" path="trips/:tripId" handler={Currenttrip} />
    <Route name='page2' path='/2page' handler={Page2} />
    <Route name='addtrip' path='/addtrip' handler={AddTrip} />
    <Route name='edittrip' path='/edittrip/:tripId' handler={EditTrip} />
    <Route name='test' path='/test' handler={Test} />
    <Route name='maintrips2' path='/maintrips2' handler={MainTrips} />
    <NotFoundRoute handler={Page4} />
  </Route>
);
