import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import {Col} from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';
import  FileInput from './FileInput'
import $ from 'jquery';


class ItemInfo extends Component {

  renderSingleItem(){
    let theItem =  _.map(_.omit(this.props.theItem, '_id'), (value,field) => {
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
  imagePreview () {
    console.log(this.props.state);
    // return(

      if (this.props.state.form['editItemInfo_'+this.props.theItem._id] !== undefined) {
        if (this.props.state.form['editItemInfo_'+this.props.theItem._id].values.add_photo !== undefined) {
          console.log(this.props.state.form['editItemInfo_'+this.props.theItem._id].values.add_photo[0].preview);
          return (
              <img width="200px" src={this.props.state.form['editItemInfo_'+this.props.theItem._id].values.add_photo[0].preview} />
          );
        }
      }
      // <img src={this.props.values.add_photo}
    // );
  }
  render() {      
    return (
        <Col key={this.props.theItem._id} md={3}>
          <form id={this.props.theItem._id}>
            {this.renderSingleItem(this.props.theItem)}
            {this.imagePreview()}
            <FileInput
            name="add_photo"
            label="Others:"
             classNameLabel="file-input-label"
             className="file-input"
             dropzone_options={{
               multiple: false,
               accept: 'image/*'
             }}
           >
             <span>Add more</span>
           </FileInput>
            <RaisedButton 
              onClick={()=>{
                this.props.deleteItem(this.props.item._id, this.props.listingId);
              }}
              secondary={true} label="Remove Item"/>
            <RaisedButton 
            onClick={()=>{
                let values =  $('#'+this.props.theItem._id).serializeArray();
                let inputs = {};
                $.each(values, function(k, v){
                    inputs[v.name]= v.value;
                });
                this.props.updateItem(inputs,this.props.theItem._id, this.props.listingId);
              }
            }
            primary={true} label="Update Item"/>
          </form>
        </Col>
    );
  }
}


function mapStateToProps(state, ownProps) {
  console.log(state);
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
