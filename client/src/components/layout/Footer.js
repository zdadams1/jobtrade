import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

//bring in profile, change links to /.../${profile.locname}

class Footer extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let footerContent;

    if (profile === null || loading) {
      footerContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        footerContent = (
          <ul className='footer-menu'>
            <li>
              <Link className='text-white' to={`/chat/${profile.locname}`}>
                Chat
              </Link>
            </li>
            <li>
              <Link className='text-white' to={`/jobs/${profile.locname}`}>
                Jobs
              </Link>
            </li>
            <li>
              <Link className='text-white' to={`/market/${profile.locname}`}>
                Market
              </Link>
            </li>
          </ul>
        );
      } else {
        footerContent = (
          <h6>Copyright &copy; {new Date().getFullYear()} JobTrade</h6>
        );
      }
    }

    return (
      <footer className='bg-danger text-white app-footer fixed-bottom pt-3 text-center'>
        {footerContent}
      </footer>
    );
  }
}

Footer.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Footer);
