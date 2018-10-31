import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Footer extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="footer-menu">
        <li>
          <Link className="text-white" to="/add-options">
            Options
          </Link>
        </li>
        <li>
          <Link className="text-white" to="/search">
            Search
          </Link>
        </li>
        <li>
          <Link className="text-white" to="/requests">
            Requests
          </Link>
        </li>
        <li>
          <Link className="text-white" to="/groups">
            Groups
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <h6>Copyright &copy; {new Date().getFullYear()} Group</h6>
    );
    return (
      <footer className="bg-success text-white app-footer fixed-bottom pt-3 text-center">
        {isAuthenticated ? authLinks : guestLinks}
      </footer>
    );
  }
}

Footer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Footer);
