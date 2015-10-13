'use strict';

import React from 'react';
import { Link, Route, RouteHandler } from 'react-router';
import Moment from 'moment';
Moment.locale('ru');

let { PropTypes } = React;

class TripsList extends React.Component {

  render() {
    return (
      <div>
        <h2 className={'text-uppercase'}>Поездки</h2>
        <ul className={'trip-search-result'}>
          {this.props.trips.map(function(trip, index){
            console.log('trip');
            console.log(trip);
            if (trip.driver) {
              var driver = trip.driver.name;
            } else {
              var driver = 'не найден';
            }
            if (trip.to_location.length > 0) {
              var to_location = 'г.' + trip.to_location[0].name + ', ' + trip.to_location[0].region;
              console.log(to_location);
            } else {
              var to_location = 'не найден';
            }
            if (trip.from_location.length > 0) {
              var from_location = 'г.' + trip.from_location[0].name + ', ' + trip.from_location[0].region;
              console.log(from_location);
            } else {
              var from_location = 'не найден';
            }
            return <li key={index} className={'trip'}>
                    <Link to="currenttrip" params={{tripId: trip.trip.id}}>
                      <div className={'row'}>
                        <div className={'user col-md-4'}>
                          <h3>{driver}</h3>
                          <p>{Moment(trip.trip.departure).format('LLLL')}</p>
                        </div>
                        <div className={'fromto col-md-4'}>
                          <h4>Откуда: {from_location}</h4>
                          <h4>Куда: {to_location}</h4>
                        </div>
                        <div className={'description col-md-4'}>
                          <h4>Описание: {trip.trip.description}</h4>
                        </div>
                      </div>
                    </Link>
                   </li>
          })}
        </ul>
      </div>
    );
  }
}

// TripsList.propTypes = {
//   trips: PropTypes.array.isRequired
// };

export default TripsList;
