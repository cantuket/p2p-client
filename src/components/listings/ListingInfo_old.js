import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {Row} from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';
require('jquery');

class ListingInfo extends Component {


  renderListingInfo() {
    const theListing  = _.omit(this.props.listings[0], ['_id','_user','__v', 'items'] );

    return _.map(theListing, (value,field) => {
      return (
        <div key={field}>
          <label>{field}</label>
          <input type="text" name={field} defaultValue={value} style={{ marginBottom: '5px' }} />
          <div className="red-text" style={{ marginBottom: '20px' }}>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
        <form onSubmit={
            this.props.handleSubmit(values =>  console.log(values)) 
        }>
          <h2>Listing Info</h2>
          {this.renderListingInfo()}
          <RaisedButton type="submit" primary={true} label="Update Info"/>
        </form>
    );
  }
}

function mapStateToProps({listings}) {
  return {
    listings,
    // formValues:listings[0]
  };
}

let MyFrom = reduxForm({
  form: 'editListingInfo'
})(ListingInfo)
MyFrom = connect(mapStateToProps,actions)(MyFrom)
export default MyFrom