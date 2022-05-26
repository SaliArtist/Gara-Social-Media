import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  type,
  placeholder,
  value,
  error,
  icon,
  onChange,
}) => {
  return (
    <div className='login-input-container'>
      <div className='input.group.prepend'>
        <span className='input-group-text'>
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames('login-input', {
          'border-2 border-red-500': error,
        })}
        name={name}
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete='off'
      />
    </div>
  );
};
InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  icon: PropTypes.string,
};
InputGroup.defaultProps = {
  type: 'text',
};
export default InputGroup;
