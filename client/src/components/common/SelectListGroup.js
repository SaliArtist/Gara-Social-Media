import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map((option) => (
    <options key={option.label} value={option.value}>
      {option.label}
    </options>
  ));
  return (
    <div className='login-input-container'>
      <select
        className={classnames('login-input', {
          'border-2 border-red-500': error,
        })}
        name={name}
        col='40'
        row='6'
        id={name}
        value={value}
        onChange={onChange}
        autoComplete='off'
      >
        {selectOptions}
      </select>
      {info && <small className='form-text info-text'>{info}</small>}
    </div>
  );
};
SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  info: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};
export default SelectListGroup;
