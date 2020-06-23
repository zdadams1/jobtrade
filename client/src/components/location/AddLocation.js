import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { addLocation } from '../../actions/profileActions';
import { addUserToChat } from '../../actions/chatActions';
import { addUserToMarket } from '../../actions/itemActions';
import { addUserToJobs } from '../../actions/jobActions';
import { createProfile } from '../../actions/profileActions';

class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locname: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;

    const corrected = this.state.locname.replace(' ', '%20');
    const locationData = {
      locname: corrected,
      users: user.id
    };
    console.log(locationData);

    this.props.addUserToChat(locationData);
    this.props.addUserToMarket(locationData);
    this.props.addUserToJobs(locationData);
    this.props.addLocation(locationData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Add Location</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='city, st'
                  name='locname'
                  value={this.state.locname}
                  onChange={this.onChange}
                  error={errors.location}
                  info='enter full city with a comma and xx state.'
                />
                <input
                  type='submit'
                  value='Submit'
                  className='btn btn-success btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddLocation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLocation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {
  addLocation,
  createProfile,
  addUserToChat,
  addUserToMarket,
  addUserToJobs
})(withRouter(AddLocation));
