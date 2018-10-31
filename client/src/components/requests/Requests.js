import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RequestFeed from "./RequestFeed";
import Spinner from "../common/Spinner";
import { getCurrentProfile } from "../../actions/profileActions";

class Requests extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;

    let requestContent;

    if (profile === null || loading) {
      requestContent = <Spinner />;
    } else {
      if (profile.requests.length > 0) {
        requestContent = <RequestFeed profile={profile} />;
      } else {
        requestContent = (
          <h4 className="text-center">You have no requests yet</h4>
        );
      }
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{requestContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Requests.propTypes = {
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
  { getCurrentProfile }
)(Requests);
