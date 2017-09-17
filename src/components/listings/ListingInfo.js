import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import RaisedButton from 'material-ui/RaisedButton';
import {Col, Row} from 'react-grid-system';

class ListingInfo extends Component {

  renderListingInfo() {
      let theListing  = _.omit(this.props.listing.listing, ['_id','_user','__v', 'items'] ); 
      
      let items = _.map(theListing, (value,field) => {
        return (
          <Col md={12} key={field}>
            <label>{field}</label>
            <Field component="input" type="text" name={field} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
            </div>
          </Col>
        );
      });
      return items || <div></div>;
  }

  render() {
    return (
        <form onSubmit={
            this.props.handleSubmit((values) =>this.props.updateListing(values)) 
        }>
          <h1>Info</h1>
          <Row>
            {this.renderListingInfo()}
          </Row>
          <RaisedButton type="submit"  primary={true} label="Update Info" />
          <RaisedButton 
          onClick={()=>{
            this.props.deleteListing(this.props.listing.listing._id, this.props.history);
          }} 
          secondary={true} label="X Delete this Listing" />
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

ListingInfo = connect(mapStateToProps,actions)(withRouter(ListingInfo))

export default ListingInfo

