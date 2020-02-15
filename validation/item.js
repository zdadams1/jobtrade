const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateItemInput(data) {
  let errors = {};

  data.itemname = !isEmpty(data.itemname) ? data.itemname : '';

  if (Validator.isEmpty(data.itemname)) {
    errors.itemname = 'Name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
