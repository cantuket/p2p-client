import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import RaisedButton from 'material-ui/RaisedButton';
import itemFields from './itemFields';
require('jquery');

class AddItem extends Component {

  renderAddItem() { 
    return _.map(itemFields, ({name ,label}) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <Field component="input" type="text" name={name}  style={{ marginBottom: '5px' }} />
          <div className="red-text" style={{ marginBottom: '20px' }}>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
        <form onSubmit={
             this.props.handleSubmit((values) => {
              const listingId = this.props.listing.listing['_id'];
              this.props.addItem(values,listingId);
              this.props.reset();
            })
        }>
          <h4>Add Item to Listing</h4>
          {this.renderAddItem()}
          <RaisedButton type="submit" primary={true} label="Add Item"/>
        </form>
    );
  }
}


function mapStateToProps({listing}) {
  return {
    listing
  };
}

let MyFrom = reduxForm({
  form: 'addItem',
})(AddItem)

MyFrom = connect(mapStateToProps,actions)(MyFrom)

export default MyFrom

