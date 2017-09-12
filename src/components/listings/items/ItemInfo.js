import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import {Col} from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';

class ItemInfo extends Component {

  renderSingleItem(item){
    let theItem =  _.map(_.omit(item, '_id'), (value,field) => {
        return (
          <div key={field}>
            <label>{field}</label>
            <Field component="input" type="text" name={field} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
            </div>
          </div>
        );
      });
    return theItem || <div></div>;
  }

  renderItemInfo() {

      if (this.props.listing.listing !== undefined) {
        console.log(this.props.listing);
        let theItems = _.map(this.props.listing.listing.items, item => {
            
            return (
                <Col key={item._id} md={3}>
                  <form form={`editItemInfo_${item._id}`} initialValues={item}>
                    {this.renderSingleItem(item)}
                    <RaisedButton secondary={true} label="Remove Item"/>
                    <RaisedButton primary={true} label="Update Item"/>
                  </form>
                </Col>
            );
        });
        return theItems || <div></div>;
      }
      
  }

  render() {
    return (
        <div className="row">
            {this.renderItemInfo()}
        </div>
    );
  }
}

function mapStateToProps({listing}) {
  return { listing };
}

ItemInfo = reduxForm({
  fields: ["text"],
  enableReinitialize: true
})(ItemInfo)

ItemInfo = connect(mapStateToProps,actions)(ItemInfo)

export default ItemInfo