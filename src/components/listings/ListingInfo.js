import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import RaisedButton from 'material-ui/RaisedButton';

class ListingInfo extends Component {

  renderListingInfo() {
      let theListing  = _.omit(this.props.listing.listing, ['_id','_user','__v', 'items'] ); 
      
      let items = _.map(theListing, (value,field) => {
        return (
          <div key={field}>
            <label>{field}</label>
            <Field component="input" type="text" name={field} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
               Value: {value}
            </div>
          </div>
        );
      });
      return items || <div></div>;
  }

  render() {
    return (
        <form onSubmit={
            this.props.handleSubmit((values) =>this.props.updateListing(values)) 
        }>
          <h2>Listing Info</h2>
          {this.renderListingInfo()}
          <RaisedButton type="submit"  primary={true} label="Update Info" />
        </form>
    );
  }
}

function mapStateToProps({listing}) {
  return {  
    initialValues:listing.listing,
    listing
  };
}

ListingInfo = reduxForm({
  form: 'editListingInfo',
  enableReinitialize: true,
})(ListingInfo)

ListingInfo = connect(mapStateToProps,actions)(ListingInfo)

export default ListingInfo

