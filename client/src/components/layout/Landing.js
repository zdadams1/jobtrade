import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/add-options");
    }
    this.props.getCurrentProfile();
  }
  render() {
    const { profile } = this.props.profile;

    let landingPageContent;

    if (profile === null) {
      landingPageContent = (
        <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4">Group</h1>
                  <p className="lead">
                    {" "}
                    Find people with common interests, no strings attached.
                  </p>
                  <hr />
                  <Link to="/register" className="btn btn-lg btn-success mr-2">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-light">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      landingPageContent = (
        <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4">Group</h1>
                  <p className="lead">
                    {" "}
                    Find people with common interests, no strings attached.
                  </p>
                  <hr />
                  <Link to="/register" className="btn btn-lg btn-success mr-2">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-light">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>{landingPageContent}</div>;
  }
}

Landing.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Landing);
