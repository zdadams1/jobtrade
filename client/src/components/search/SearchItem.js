import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class SearchItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <Link to={`/profile/${profile.handle}`}>
          <div className="row">
            <div className="col-2">
              <img src={profile.user.image} alt="" className="rounded-circle" />
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{profile.user.name}</h3>
              <div>{profile.thing}</div>
              <div>
                {isEmpty(profile.options[0].places) ? null : (
                  <div>I want to go to {profile.options[0].places}</div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

SearchItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default SearchItem;
