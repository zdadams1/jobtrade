import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import SearchItem from "./SearchItem";
import SearchCategory from "./SearchCategory";
import { getProfiles, getCurrentProfile } from "../../actions/profileActions";

class Search extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading, profile } = this.props.profile;
    const { user } = this.props.auth;
    let profileItems;
    let profileItem;

    if (profile === null || loading || Object.keys(profile).length === 0) {
      profileItem = <div className="blank">blank</div>;
    } else {
      if (
        profile.options === null ||
        loading ||
        profile.options === undefined
      ) {
        profileItem = <div className="blank">blank</div>;
      } else {
        profileItem = (
          <SearchCategory value={profile.options[0].category} profile={profile}>
            {profile.options[0].category}
          </SearchCategory>
        );
      }
    }
    const userCategory = profileItem.props.children;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => {
          const otherUserCategory = profile.options[0].category;
          if (userCategory === otherUserCategory) {
            console.log(profile.user, user);
            if (profile.user._id !== user.id) {
              return <SearchItem key={profile._id} profile={profile} />;
            }
          }
        });
      } else {
        profileItems = (
          <h4>'There is no one found, try expanding your search radius'</h4>
        );
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="search-header text-center">
                Find people interested in{" "}
                <span className="search-header-item">{profileItem}</span>
              </h1>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfiles, getCurrentProfile }
)(Search);
