import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import {Col,Row} from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';

import FileInput from './FileInput';
import $ from 'jquery';


class ItemInfo extends Component {
  
  renderSingleItem(){
    let theItem =  _.map(_.omit(this.props.theItem, ['_id','imageUrl']), (value,field) => {
        return (
          <Col md={4} key={field}>
            <label>{field}</label>
            <Field component="input" type="text" name={field} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}></div>
          </Col>
        );
      });
    return theItem || <div></div>;
  }
  imagePreview () {
      if (this.props.state.form['editItemInfo_'+this.props.theItem._id] !== undefined) {
        if (this.props.state.form['editItemInfo_'+this.props.theItem._id].values.uploadfile !== undefined) {
          console.log(this.props.state.form['editItemInfo_'+this.props.theItem._id].values.uploadfile[0].preview);
          return (
            <div>
              <h5>Preview</h5>
              <img width="200px" src={this.props.state.form['editItemInfo_'+this.props.theItem._id].values.uploadfile[0].preview} />
            </div>
          );
        }
      }
  }

  getImage () {
    if  (this.props.theItem.imageUrl !== undefined) {
      return (
      <div>
        <h5>Current Image</h5>
        <img width="200px"  src={this.props.theItem.imageUrl} />
      </div>
      );
    }
  }

  render() {      
    return (
        <Col key={this.props.theItem._id} md={12}>
          <form id={this.props.theItem._id} style={{marginTop:'20px'}}>
            {this.renderSingleItem(this.props.theItem)}
            <Row>
              <Col md={4}>
                {this.getImage()}
              </Col>
              <Col md={4}>
              {this.imagePreview()}
              </Col>
              <Col md={4}>
              <Field component={ FileInput } name='uploadfile' />
              </Col>
            </Row>
            
            <RaisedButton 
              onClick={()=>{
                  let inputs = this.props.state.form['editItemInfo_'+this.props.theItem._id].values;
                  let values = _.omit(inputs,'uploadfile');
                    if (inputs.uploadfile !== undefined ){
                      let image = inputs.uploadfile[0];
                      var reader = new FileReader();
                        reader.onload = event => {
                          this.props.updateItem(reader.result ,image, values, this.props.theItem._id, this.props.listingId);
                        }
                        reader.readAsDataURL(image)
                    } else {
                      this.props.updateItem(null ,null, values, this.props.theItem._id, this.props.listingId);
                    }
                  }
                }
              primary={true} 
              label="Update Item"
            />
            <RaisedButton 
              onClick={()=>{this.props.deleteItem(this.props.item._id, this.props.listingId);}}
              secondary={true} label="Remove Item"
            />
          </form>
          
        </Col>
    );
  }
}



function mapStateToProps(state, ownProps) {
  console.log(ownProps);
  return { 
    state,
    theItem:ownProps.item,
    listingId:ownProps.listingId,
    deleteItem:ownProps.deleteAction,
    updateItem:ownProps.updateAction
  };
}

ItemInfo = reduxForm({
  fields: ["text"],
  enableReinitialize: true,
})(ItemInfo)

ItemInfo = connect(mapStateToProps,actions)(ItemInfo)

export default ItemInfo
