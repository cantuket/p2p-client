import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

/**
 * file field that supported dnd
 */
export default class FileField extends Component {
    
  handleDropOrClick = (acceptedFiles, rejectedFiles, e) => {
    let eventOrValue = e;
    let {input: {onChange, onBlur}} = this.props;
    if (e.type === 'drop') {
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
    };
    return (
      <div>
        <input type='hidden' id="theFile" disabled {...input} />
        <h5>Change Photo</h5>
        <p>Drag below or click to select from folder</p>
        {selectedFile? <span>{selectedFile.name}</span> : null}
        <Dropzone {...dropzoneProps} />  
      </div>
      );
  }
}
