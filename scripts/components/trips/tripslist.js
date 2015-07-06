'use strict';

import React from 'react';
import { Link, Route, RouteHandler } from 'react-router';

let { PropTypes } = React;

class TripsList extends React.Component {

  render() {
    return (
      <ul className={'trip-search-result'}>
        {this.props.trips.map(function(trip, index){
          return <li key={index} className={'trip'}>
                  <Link to="currenttrip" params={{tripId: trip.id}}>
                    <article className={'row'}>
                      <div className={'user'}>
                        <h1>User Id: {trip.user_id}</h1>
                      </div>
                      <div className={'description'}>
                        <h2>Description: {trip.description}</h2>
                      </div>
                    </article>
                  </Link>
                 </li>
        })}
      </ul>
    );
  }
}

// TripsList.propTypes = {
//   trips: PropTypes.array.isRequired
// };

export default TripsList;
