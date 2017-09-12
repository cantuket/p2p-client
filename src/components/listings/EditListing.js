import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListingInfo from './ListingInfo';
import ItemsInfo from './items/ItemInfo';
import AddItem from './items/AddItem';
import * as actions from '../../actions';
import {Col, Row} from 'react-grid-system';
import { withRouter } from 'react-router-dom';

class EditListing extends Component {

  componentWillMount () {  
      const listingId = this.props.match.params.listingId;
      this.props.fetchSingleListing(listingId);
  }

  render() {
    return (
      <div key={0}>
        <Row>
          <Col key={0} md={6}>
            <ListingInfo/>
          </Col>
          <Col key={1} md={6}>  
            <AddItem/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h3>Current Items</h3>
            <ItemsInfo/>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps({listing}) {
  return {listing};
}

export default connect(mapStateToProps,actions)(withRouter(EditListing))
