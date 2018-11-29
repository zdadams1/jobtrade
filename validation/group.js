const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateGroupInput(data) {
  let errors = {};

  data.groupname = !isEmpty(data.groupname) ? data.groupname : "";

  if (Validator.isEmpty(data.groupname)) {
    errors.groupname = "Group name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
