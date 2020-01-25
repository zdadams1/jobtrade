import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Footer extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className='footer-menu'>
        <li>
          <Link className='text-white' to='/chat'>
            Chat
          </Link>
        </li>
        <li>
          <Link className='text-white' to='/job-items'>
            Search
          </Link>
        </li>
        <li>
          <Link className='text-white' to='/requests'>
            Requests
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <h6>Copyright &copy; {new Date().getFullYear()} JobTrade</h6>
    );
    return (
      <footer className='bg-danger text-white app-footer fixed-bottom pt-3 text-center'>
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
