const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateGroupInput(data) {
  let errors = {};

  data.message = !isEmpty(data.message) ? data.message : "";

  if (Validator.isEmpty(data.message)) {
    errors.message = "Message field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
