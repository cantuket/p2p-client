import React, {Component} from 'react';
import Dropzone from 'react-dropzone';


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
    let {input, meta: {touched, error}} = this.props;
    let {accept, multiple} = this.props;
    let selectedFile = (input && input.value && input.value[0]) || null;
    let dropzoneProps = {
      accept,
      multiple,
      onDrop: this.handleDropOrClick,
      // style:{
      //   width:'100px',
      //   height:'100px',
      //   border:'3px solid #000'
      // }      
    };
    return (
      <div style={fileUploader}>
         <h5 style={dropSectionHeader}>Change Photo</h5>
        <input type='hidden' id="theFile" disabled {...input} />
        <p style={dropSectionBody}>Drag Image or Click Here</p>
        {/*selectedFile? <span>{selectedFile.name}</span> : null*/}
        <Dropzone {...dropzoneProps} />  
      </div>
      );
  }
}
