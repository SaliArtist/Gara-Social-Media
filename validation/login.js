const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateLoginInput(data) {
  let errors = {};
  data.uname = !isEmpty(data.uname) ? data.uname : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  if (Validator.isEmpty(data.uname)) {
    errors.uname = 'Email/Username Required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Please, Enter Password';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
