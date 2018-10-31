import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addOptions } from "../../actions/profileActions";

class AddOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      places: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const optData = {
      category: this.state.category,
      places: this.state.places
    };

    this.props.addOptions(optData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: "* Select Category", value: 0 },
      { label: "Outdoor Activity", value: "Outdoor" },
      { label: "Indoor Recreation", value: "Indoor" },
      { label: "Nightlife", value: "Nightlife" },
      { label: "Food and Dining", value: "Food" }
    ];

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Category and Places</h1>
              <hr />
              <hr />
              <hr />
              <form onSubmit={this.onSubmit}>
                <SelectListGroup
                  placeholder="* Category"
                  name="category"
                  value={this.state.category}
                  onChange={this.onChange}
                  error={errors.category}
                  options={options}
                />
                <TextFieldGroup
                  placeholder="Add places that you'd like to go"
                  name="places"
                  value={this.state.places}
                  onChange={this.onChange}
                  error={errors.places}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddOptions.propTypes = {
  addOptions: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addOptions }
)(withRouter(AddOptions));
