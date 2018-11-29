import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addOptions, getCurrentProfile } from "../../actions/profileActions";
import axios from "axios";

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

  componentDidMount() {
    axios
      .get("api/profile")
      .then(profile => {
        if (profile.status === 200) {
          return;
        } else {
          this.props.history.push("/settings");
        }
      })
      .catch(profile => {
        if (profile.status !== 200) {
          this.props.history.push("/settings");
        } else {
          return;
        }
      });
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
    console.log(e.target.value);
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

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="option-header text-center">
                Add Category and Places
              </h1>

              <form onSubmit={this.onSubmit}>
                <ul className="category-options">
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="category"
                        value="Indoor"
                        checked={this.state.category === "Indoor"}
                        onChange={this.onChange}
                        error={errors.category}
                      />
                      <span className="checkmark"> </span>Indoor Recreation
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="category"
                        value="Outdoor"
                        checked={this.state.category === "Outdoor"}
                        onChange={this.onChange}
                        error={errors.category}
                      />
                      <span className="checkmark"> </span> Outdoor Activity
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="category"
                        value="Food"
                        checked={this.state.category === "Food"}
                        onChange={this.onChange}
                        error={errors.category}
                      />
                      <span className="checkmark"> </span>Food and Dining
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="category"
                        value="Nightlife"
                        checked={this.state.category === "Nightlife"}
                        onChange={this.onChange}
                        error={errors.category}
                      />
                      <span className="checkmark"> </span>Nightlife
                    </label>
                  </li>
                </ul>
                <TextFieldGroup
                  placeholder="Hiking, surfing, climbing"
                  name="places"
                  value={this.state.places}
                  onChange={this.onChange}
                  error={errors.places}
                />
                <h5 className="place-info-header">
                  Add Destinations or Activities in a comma separated list
                </h5>
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
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addOptions, getCurrentProfile }
)(withRouter(AddOptions));
