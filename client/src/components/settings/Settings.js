import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { logoutUser } from "../../actions/authActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";

class Settings extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onLogoutClick(e) {
    this.props.logoutUser();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <div style={{ marginBottom: "60px" }} />
            <ul className="settings-buttons">
              <li>
                <button
                  onClick={this.onLogoutClick.bind(this)}
                  className="btn btn-warning"
                >
                  Logout
                </button>
              </li>
              <li>
                <button
                  onClick={this.onDeleteClick.bind(this)}
                  className="btn btn-danger"
                >
                  Delete My Account
                </button>
              </li>
            </ul>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <ul className="settings-buttons">
              <li>
                <Link to="/create-profile" className="btn btn-lg btn-success">
                  Create Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={this.onLogoutClick.bind(this)}
                  className="btn btn-warning"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12 settings">
              <h1 className="settings-header">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, logoutUser }
)(Settings);
