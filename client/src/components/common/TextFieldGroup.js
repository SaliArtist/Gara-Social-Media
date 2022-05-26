import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  label,
  value,
  error,
  info,
  type,
  onChange,
  onBlur,
  disabled,
}) => {
  return (
    <div className='login-input-container'>
      <input
        className={classnames('login-input', {
          'border-2 border-red-500': error,
        })}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete='off'
      />
      {info && <small className='info-text has-text-align-left'>{info}</small>}
    </div>
  );
};
TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
};
TextFieldGroup.defaultProps = {
  type: 'text',
};
export default TextFieldGroup;
