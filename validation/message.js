const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMessageInput(data) {
  let errors = {};

  data.message = !isEmpty(data.message) ? data.message : "";

  if (Validator.isEmpty(data.message)) {
    errors.message = "Please leave a message";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
