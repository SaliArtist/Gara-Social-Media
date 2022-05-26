import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaGroup = ({ name, placeholder, value, error, info, onChange }) => {
  return (
    <div className='login-input-container'>
      <textarea
        className={classnames('login-input h-24', {
          'border-2 border-red-500': error,
        })}
        name={name}
        col='40'
        row='6'
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete='off'
      ></textarea>
      {info && <small className='info-text'>{info}</small>}
    </div>
  );
};
TextAreaGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  info: PropTypes.string.isRequired,
};
export default TextAreaGroup;
