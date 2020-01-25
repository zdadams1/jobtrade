const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateJobItemInput(data) {
  let errors = {};

  data.jobitemname = !isEmpty(data.jobitemname) ? data.jobitemname : '';

  if (Validator.isEmpty(data.jobitemname)) {
    errors.jobitemname = 'Name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
