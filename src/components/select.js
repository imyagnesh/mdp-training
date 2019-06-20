import React from 'react';
import PropTypes from 'prop-types';

const select = ({ field, form: { touched, errors }, placeholder, data, ...props }) => {
  return (
    <div>
      <select {...field} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {data.map(x => (
          <option key={x.value} value={x.value}>
            {x.text}
          </option>
        ))}
      </select>
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  );
};

select.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

select.defaultProps = {
  placeholder: '',
};

export default select;
