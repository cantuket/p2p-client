// ListingFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import listingFields from './listingFields';
import itemFields from './items/itemFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import RaisedButton from 'material-ui/RaisedButton';

const ListingFormReview = ({ onCancel, formValues, createListing, history, reset }) => {
  const reviewListingFields = _.map(listingFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });
  const reviewItemFields = _.map(itemFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewListingFields}
      {reviewItemFields}
      <RaisedButton 
        onClick={onCancel}
        type="submit" 
        secondary={true} 
        label="Back"
      />
      <RaisedButton 
        onClick={() => {
          createListing(formValues, history);
        }}
        type="submit" 
        primary={true} 
        label="Create Listing"
      />

    </div>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return { 
    formValues: state.form.listingForm.values,
  };
}

export default connect(mapStateToProps, actions)(withRouter(ListingFormReview));
