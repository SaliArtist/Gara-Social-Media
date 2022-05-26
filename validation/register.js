const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.fname = !isEmpty(data.fname) ? data.fname : '';
  data.lname = !isEmpty(data.lname) ? data.lname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.conpassword = !isEmpty(data.conpassword) ? data.conpassword : '';
  if (Validator.isEmpty(data.fname)) {
    errors.fname = 'First Name Is Required';
  } else if (!Validator.isLength(data.fname, { min: 2, max: 30 })) {
    errors.fname = 'First Name Must Be Between 2 and 30 Characters';
  }
  if (Validator.isEmpty(data.lname)) {
    errors.lname = 'Last Name Is Required';
  } else if (!Validator.isLength(data.lname, { min: 2, max: 30 })) {
    errors.lname = 'Last Name Must Be Between 2 and 30 Characters';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email Is Required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid Email Format';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password Is Required';
  } else if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = 'Password Is Too Short';
  }
  if (!Validator.equals(data.password, data.conpassword)) {
    errors.conpassword = `Passwords Don't Match`;
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
