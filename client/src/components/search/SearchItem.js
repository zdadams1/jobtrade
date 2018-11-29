import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import defaultImage from "../../img/default-pic.jpg";

class SearchItem extends Component {
  render() {
    const { profile } = this.props;

    let image;

    if (profile.image === null || profile.image === undefined) {
      image = defaultImage;
    } else {
      image = profile.image;
    }

    return (
      <div className="card card-body mb-3 search-item">
        <div className="">
          <div className="">
            <img src={image} />
          </div>
          <div className="">
            <h3>{profile.user.name}</h3>
            <div>{profile.thing}</div>
            <div className="mb-1">
              {isEmpty(profile.options[0].places) ? null : (
                <div>I want to go to {profile.options[0].places}</div>
              )}
            </div>
            <button className="btn btn-success btn-lg">
              <Link className="text-white" to={`/profile/${profile.handle}`}>
                View Profile
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

SearchItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default SearchItem;
