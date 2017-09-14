import React from 'react'

export const renderTextField = ({input, type, label, meta: {touched, error}, ...custom}) => (  // Define stateless component to render input and errors
  <div>
    <input
      type={type}
      // floatingLabelText={label}
      {...input}
      {...custom}
      className="black-text"
    />
    {touched && error && <span className="error">{error}</span>}
  </div>
)
