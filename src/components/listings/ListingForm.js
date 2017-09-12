// ListingForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import ListingField from './ListingField';
import listingFields from './listingFields';
import itemFields from './items/itemFields';
import RaisedButton from 'material-ui/RaisedButton';

class ListingForm extends Component {

  renderListingFields() {
    return _.map(listingFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={ListingField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
   renderItemFields() {
    return _.map(itemFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={ListingField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onListingSubmit)}>
          <h5>Create a new Listing</h5>
          {this.renderListingFields()}
          <h5>And add your first item to listing</h5>
           {this.renderItemFields()}
          <Link to="/listings" className="red btn-flat white-text">
            Cancel
          </Link>
          <RaisedButton type="submit" primary={true} label="Next"/>
        </form>
      </div>
    );
  }
}



function validate(values) {
  const errors = {};

  // errors.recipients = validateEmails(values.recipients || '');

  _.each(listingFields, ({ name },i) => {
    if (!values[name] && listingFields[i].required) {
      errors[name] = 'You must provide a value';
    }
  });
  _.each(itemFields, ({ name },i) => {
    if (!values[name] && itemFields[i].required) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'listingForm',
  destroyOnUnmount: false,
})(ListingForm);
