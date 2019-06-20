import React from 'react';
import PropTypes from 'prop-types';

const inputText = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <div>
      <input type="text" {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  );
};

inputText.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

export default inputText;
