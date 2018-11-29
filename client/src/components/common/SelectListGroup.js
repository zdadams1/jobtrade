import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  name,
  value,
  error,
  info,
  onChange,
  options,
  onClick,
  placeholder
}) => {
  console.log(options.map(option => option._id));
  const selectOptions = options.map(option => (
    <option key={option.groupname} value={option._id}>
      {option.groupname}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onClick={onClick}
        onChange={onChange}
        placeholder={placeholder}
      >
        <option>Select Group</option>
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default SelectListGroup;
