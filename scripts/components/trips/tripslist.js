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
            console.log(trip);
            if (trip.driver) {
              var driver = trip.driver.name;
            } else {
              var driver = 'не найден';
            }
            return <li key={index} className={'trip'}>
                    <Link to="currenttrip" params={{tripId: trip.trip.id}}>
                      <div className={'row'}>
                        <div className={'user col-md-4'}>
                          <h3>{driver}</h3>
                          <p>{Moment(trip.trip.departure).format('LLLL')}</p>
                        </div>
                        <div className={'fromto col-md-4'}>
                          <h3>Откуда: {trip.trip.from_location_id}</h3>
                          <h3>Куда: {trip.trip.to_location_id}</h3>
                        </div>
                        <div className={'description col-md-4'}>
                          <h3>Описание: {trip.trip.description}</h3>
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
