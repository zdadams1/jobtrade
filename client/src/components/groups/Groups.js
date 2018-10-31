import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GroupFeed from "./GroupFeed";
import Spinner from "../common/Spinner";
import { getCurrentProfile } from "../../actions/profileActions";

class Groups extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;
    let groupContent;
    if (profile === null || loading) {
      groupContent = <Spinner />;
    } else {
      if (profile.groups.length > 0) {
        groupContent = <GroupFeed profile={profile} />;
      } else {
        groupContent = <h4 className="text-center">You have no groups yet</h4>;
      }
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{groupContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Groups.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Groups);
