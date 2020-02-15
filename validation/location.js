const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.locname = !isEmpty(data.locname) ? data.locname : '';

  if (Validator.isEmpty(data.locname)) {
    errors.location = "Location is required as 'city, st' format";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
