import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import defaultImage from "../../img/default-pic.jpg";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props;

    let image;

    if (profile.image === null || profile.image === undefined) {
      image = defaultImage;
    } else {
      image = profile.image;
    }

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/settings">
            <img
              className="rounded-circle"
              src={image}
              style={{ width: "25px", marginRight: "5px" }}
            />
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/business">
            List your Business
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar  navbar-dark bg-success fixed-top mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Group
          </Link>

          <div className="">{isAuthenticated ? authLinks : guestLinks}</div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { clearCurrentProfile }
)(Navbar);
