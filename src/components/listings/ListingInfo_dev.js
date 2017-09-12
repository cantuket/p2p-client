import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import updateListing from '../../actions';
import RaisedButton from 'material-ui/RaisedButton';

class ListingInfo extends Component {


  renderListingInfo() {
      return _.map(this.props.theListing, (value, field) => {
        return (
          <div key={field}>
            <label>{field}</label>
            <Field component="input" type="text" name={field}  style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
               Value: {value}
            </div>
          </div>
        );
      });
     
      // return (
      //   <div key={0}>
      //     <label>Location</label>
      //     <Field component="input" type="text" name="location"  style={{ marginBottom: '5px' }} />
      //     <div className="red-text" style={{ marginBottom: '20px' }}>
      //     </div>
      //   </div>
      // );
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
  const theListing  = _.omit(listing, ['_id','_user','__v', 'items'] );
   // const theListing = {location: "lhjvl", availability: "ljhg", price: 89765};
  console.log(theListing);
  return {
    initialValues: theListing,
    theListing
  };
}

ListingInfo = reduxForm({
  form: 'editListingInfo'
})(ListingInfo)

ListingInfo = connect(
  mapStateToProps,
  { load: updateListing } // bind account loading action creator
)(ListingInfo)

export default ListingInfo

