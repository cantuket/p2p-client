import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ListingInfo from './ListingInfo';
import ItemInfo from './items/ItemInfo';
import AddItem from './items/AddItem';
import * as actions from '../../actions';
import {Col, Row} from 'react-grid-system';

class EditListing extends Component {

  componentDidMount () {  
      const listingId = this.props.match.params.listingId;
      this.props.fetchSingleListing(listingId);
  }

  renderItemForms() {
    if (this.props.listing.listing !== undefined) {
      return _.map(this.props.listing.listing.items, item => {
          return (
            <ItemInfo deletAction={this.props.deleteItem} updateAction={this.props.updateItem} form={`editItemInfo_${item._id}`} initialValues={item} key={item._id} item={item} listingId={this.props.listing.listing._id}/> 
          );
      });
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={6}>
            <ListingInfo/>
          </Col>
          <Col md={6}>  
            <AddItem/>
          </Col>
        </Row>
          <Row>
            <Col md={12}>
              <h3>Current Items</h3>
              <div className="row">
              {this.renderItemForms()}
             </div>
            </Col>
          </Row>
      </div>
    );
  }
}

function mapStateToProps({listing}) {
  return {listing};
}

EditListing = reduxForm({
  form: 'none',
  fields: ["text"],
  enableReinitialize: true,
})(EditListing)

EditListing = connect(mapStateToProps,actions)(EditListing)

export default EditListing
