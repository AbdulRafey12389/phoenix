// NODE MODULES...
import PropTypes from 'prop-types';

import React from 'react';

function TextField({
  classes,
  helperText,
  label,
  name,
  placeholder = ' ',
  fieldClasses,
  ...rest
}) {
  return (
    <div className=''>
      <label
        htmlFor={name}
        className=''
      >
        {label}
      </label>

      <input
        className=''
        id={name}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}

TextField.propTypes = {
  classes: PropTypes.object,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  fieldClasses: PropTypes.string,
};

export default TextField;
