import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-danger mb-3">
            <h3 className="text-center text-white">Something cool about me</h3>
            <p className="lead">
              {isEmpty(profile.thing) ? (
                <span>
                  Apparently, there are no cool things about {firstName}.
                </span>
              ) : (
                <span>{profile.thing}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
