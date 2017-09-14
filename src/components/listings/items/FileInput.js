import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
// import { Form } from 'elements';
import { Field } from 'redux-form';

class FileInput extends Component {
  static propTypes = {
    dropzone_options: PropTypes.object,
    meta: PropTypes.object,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
    input: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    cbFunction: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    cbFunction: () => {},
  };

  render() {
    const { className, input: { onChange }, dropzone_options, meta: { error, touched }, label, classNameLabel, children, name, cbFunction } = this.props;

    return (
      <div className={`${className}` + (error && touched ? ' has-error ' : '')}>
        {label && <p className={classNameLabel || ''}>{label}</p>}
        <Dropzone
          {...dropzone_options}
          onDrop={(f) => {
            {/* console.log(this); */}
            cbFunction(f);
            return onChange(f);

          }}
          className="dropzone-input"
          name={name}
        >
          {children}
        </Dropzone>
        {error && touched ? error : ''}
      </div>
    );
  }
}
export default props => <Field {...props} component={FileInput} />;