import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import $ from 'jquery'
// import { change } from 'redux-form';
// import { connect } from 'react-redux';

const dropSectionBody = {
  marginBottom:'-80px',
  margin: '0 5% -120px 5%',
  textAlign: 'center',
  width: '80%',
  position:'relative',
  zIndex:'-10'
};

const dropSectionHeader = {
  width:'200px',
  textAlign:'center',
  position:'relative',
  zIndex:'-10'
};
const fileUploader = {
  marginTop:'115px',
};



/**
 * file field that supported dnd
 */
export default class FileField extends Component {
    
  handleDropOrClick = (acceptedFiles, rejectedFiles, e) => {
    let eventOrValue = e;
    let {input: {onChange, onBlur}} = this.props;
    if (e.type === 'drop' ) {
      if (acceptedFiles.length) {
        // FileList or [File]
        eventOrValue = (e.dataTransfer && e.dataTransfer.files) || acceptedFiles;
      } else {
        eventOrValue = null;
      }
    }
    onBlur(eventOrValue); // update touched
    onChange(eventOrValue); // update value
  }

  render() {
    let {input, data64bit,change, meta: {touched, error}} = this.props;
    
    // if (data64bit && input && input.value && input.value[0]) {
    //   let file = input.value[0];
    //   let reader = new FileReader();
    //   reader.onload = event => {
    //     if (data64bit === "only") {
    //       change(input.name,reader.result);
    //       console.log(this);
    //     } else {
    //       this.props.value.data64bit = reader.result;
    //     }
    //   }
    //   reader.readAsDataURL(file)
    // }
    let {accept, multiple} = this.props;
    let selectedFile = (input && input.value && input.value[0]) || null;
    let dropzoneProps = {
      accept,
      multiple,
      onDrop: this.handleDropOrClick
    };
    return (
      <div style={fileUploader}>
        <div style={{width:'50%',float:'left'}}>
          {selectedFile? 
            <span>
                <h6>Image Preview</h6>
                <img width="200px" src={selectedFile.preview}/>
                <span>{selectedFile.name}</span> 
            </span> : null}
        </div>
        <div style={{width:'50%',float:'right'}}>
          <h5 style={dropSectionHeader}>Change Photo</h5>
          <input type='hidden' id="theFile" disabled {...input} />
          <p style={dropSectionBody}>Drag Image or Click Here</p>
          <Dropzone {...dropzoneProps} />  
        </div>
      </div>
      );
  }
}




