import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import {Col} from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';


class ItemInfo extends Component {

  renderSingleItem(item){
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

  render() {      
    return (
        <Col key={this.props.theItem._id} md={3}>
          <form>
            {this.renderSingleItem(this.props.theItem)}
            <RaisedButton secondary={true} label="Remove Item"/>
            <RaisedButton primary={true} label="Update Item"/>
          </form>
        </Col>
    );
  }
}


function mapStateToProps(state, ownProps) {
  console.log(ownProps);
  return {  
    // initialValues:ownProps.item,
    theItem:ownProps.item
  };
}

ItemInfo = reduxForm({
  // form: Math.random().toString(),
  fields: ["text"],
  enableReinitialize: true,
})(ItemInfo)

ItemInfo = connect(mapStateToProps,actions)(ItemInfo)

export default ItemInfo

// function mapStateToProps({listing}) {
//   return { listing };
// }

// ItemInfo = reduxForm({
  
//   initialValues:
// })(ItemInfo)

// ItemInfo = connect(mapStateToProps,actions)(ItemInfo)

// export default ItemInfo