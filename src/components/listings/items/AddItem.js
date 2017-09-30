import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import RaisedButton from 'material-ui/RaisedButton';
import itemFields from './itemFields';
  import {Col, Row} from 'react-grid-system';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class AddItem extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    this.props.reset();
  };

  renderAddItems() { 
    return _.map(itemFields, ({name ,label}) => {
      return (
        <Col key={name} md={4}>
          <label>{label}</label>
          <Field component="input" type="text" name={name}  style={{ marginBottom: '5px' }} />
          <div className="red-text" style={{ marginBottom: '20px' }}>
          </div>
        </Col>
      );
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        type="submit"
        primary={true}
        keyboardFocused={true}
        //onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton 
          style={{marginTop: '30px'}}
          primary={true} 
          label="Add Item +" 
          onClick={this.handleOpen} 
        />
        <Dialog
          title="Add Item to Listing"
         // actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          style={{
            width:'80%',
            marginLeft:'10%'
          }}
          contentStyle={{
            width:'80%',
            maxWidth:'none',
            marginLeft:'10%'
          }}
          bodyStyle={{width:'100%'}}
        >
        <form onSubmit={
             this.props.handleSubmit((values) => {
              const listingId = this.props.listing.listing['_id'];
              console.log(values);
              this.props.addItem(values,listingId);
              this.props.reset();
              this.handleClose();
            })
        }>
        <Row>
          {this.renderAddItems()}
        </Row>  
          <FlatButton
            label="Submit"
            type="submit"
            primary={true}
            keyboardFocused={true}
          />
        </form>
        </Dialog>
      </div>
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
  enableReinitialize: true,
})(AddItem)

MyFrom = connect(mapStateToProps,actions)(MyFrom)

export default MyFrom

