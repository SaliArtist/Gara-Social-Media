const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateProfileInput(data) {
  let errors = {};
  data.uname = !isEmpty(data.uname) ? data.uname : '';
  data.website = !isEmpty(data.website) ? data.website : '';
  data.instagram = !isEmpty(data.instagram) ? data.instagram : '';
  data.twitter = !isEmpty(data.twitter) ? data.twitter : '';
  data.youtube = !isEmpty(data.youtube) ? data.youtube : '';
  data.facebook = !isEmpty(data.facebook) ? data.facebook : '';

  if (data.uname.length < 2) {
    errors.uname = 'Username Is Required';
  } else if (!Validator.isLength(data.uname, { min: 5, max: 40 })) {
    errors.uname = 'Username Length Must Be Between 5 And 40';
  }
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Website: Invalid URL';
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Instagram: Invalid URL';
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Twitter: Invalid URL';
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.tiktok = 'Facebook: Invalid URL';
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Youtube: Invalid URL';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
