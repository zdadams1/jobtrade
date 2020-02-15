import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//bring in profile, change links to /.../${profile.locname}

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
          <Link className='text-white' to='/jobs'>
            Jobs
          </Link>
        </li>
        <li>
          <Link className='text-white' to='/market'>
            Market
          </Link>
        </li>
        <li>
          <Link className='text-white' to='/messages'>
            Messages
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
