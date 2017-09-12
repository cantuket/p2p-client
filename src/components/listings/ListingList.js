import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListings } from '../../actions';
import { Link, withRouter  } from 'react-router-dom';
import _ from 'lodash';


class ListingList extends Component {
  
  componentDidMount() {
    this.props.fetchListings();
  }

  renderListings() {
    return _.map(this.props.listings, listing => {
      return (
        <div key={listing['_id']} className="card darken-1">
          <div className="card-content">
            <span className="card-title">{listing.location}</span>
            <p>
             Availability: {listing.availability}
            </p>
            <p className="right">
              Price: {listing.price}
            </p>
            <Link to={`/listing/${listing._id}`}>Edit Listing</Link>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container">
        {this.renderListings()}
      </div>
    );
  }
}

function mapStateToProps({listings}) {
  return {listings};
}

export default connect(mapStateToProps, { fetchListings })(withRouter(ListingList));
