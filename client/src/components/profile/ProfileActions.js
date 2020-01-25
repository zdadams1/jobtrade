import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

import {
  createInviteMessage,
  createRequestMessage
} from '../../actions/requestActions';
import {
  getProfileByHandle,
  getCurrentUserGroups
} from '../../actions/profileActions';
import { getJobItems } from '../../actions/jobItemActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Spinner from '../common/Spinner';
import axios from 'axios';

class ProfileActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInviteForm: false,
      displayRequestForm: false,
      handle: '',
      groupId: '',
      groups: [],
      message: '',
      errors: {}
    };

    this.onInviteClick = this.onInviteClick.bind(this);
    this.onRequestClick = this.onRequestClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onInviteSubmit = this.onInviteSubmit.bind(this);
    this.onRequestSubmit = this.onRequestSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onInviteClick() {
    axios.get('/api/profile/groups').then(groups => {
      this.setState({ groups: groups.data });
    });

    this.setState(prevState => ({
      displayInviteForm: !prevState.displayInviteForm
    }));
  }

  onRequestClick() {
    this.setState(prevState => ({
      displayRequestForm: !prevState.displayRequestForm
    }));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSelectClick = e => {
    console.log(e.target.value);
    this.setState({ groupId: e.target.value });
  };

  onInviteSubmit(e) {
    e.preventDefault();
    const { profile } = this.props;
    const { user } = this.props.auth;
    console.log(e);

    const reqData = {
      message: this.state.message,
      requestvalue: 'invite',
      groupId: this.state.groupId,
      handle: profile.profile.handle,
      user: user.id,
      sender: user.id,
      username: user.name,
      reciever: profile.profile.user._id
    };

    this.props.createInviteMessage(reqData, this.props.history);
  }

  onRequestSubmit(e) {
    e.preventDefault();
    const { profile } = this.props;
    const { user } = this.props.auth;
    console.log(profile);

    const reqData = {
      message: this.state.message,
      requestvalue: 'request',
      handle: profile.profile.handle,
      user: user.id,
      sender: user.id,
      username: user.name,
      reciever: profile.profile.user._id
    };
    console.log(reqData.reciever);

    this.props.createRequestMessage(reqData, this.props.history);
  }

  render() {
    const {
      errors,
      displayInviteForm,
      displayRequestForm,
      groups
    } = this.state;
    const { loading } = this.props;
    console.log('state', groups);

    let inviteInputs;
    let requestInputs;

    if (displayInviteForm) {
      if (groups === null || loading || groups.length === 0) {
        inviteInputs = <Spinner />;
      }
      if (groups === undefined) {
        inviteInputs = <div>You are not in any groups.</div>;
      } else {
        inviteInputs = (
          <div>
            <form onSubmit={this.onInviteSubmit}>
              <SelectListGroup
                placeholder='Select group to add to'
                name='groupId'
                value={this.state.groupId}
                options={groups}
                onChange={this.onChange}
                onClick={this.onSelectClick}
              />
              <InputGroup
                placeholder='Hey, want to join my group?'
                name='message'
                value={this.state.message}
                onChange={this.onChange}
              />

              <input
                type='submit'
                value='Submit'
                className='btn btn-success mt-4'
              />
            </form>
          </div>
        );
      }
    }

    if (displayRequestForm) {
      requestInputs = (
        <div>
          <form onSubmit={this.onRequestSubmit}>
            <InputGroup
              placeholder='Hey, do you have a group I could join, or do you want to start one?'
              name='message'
              value={this.state.message}
              onChange={this.onChange}
              error={errors.request}
            />
            <input
              type='submit'
              value='Submit'
              className='btn btn-success mt-4n mb-4 mx-10'
            />
          </form>
        </div>
      );
    }

    return (
      <div ref='myRef'>
        <hr />
        <button
          type='button'
          className='btn btn-success'
          onClick={this.onInviteClick}
        >
          <h3 className='mb-4'>Invite</h3>
        </button>
        {displayInviteForm ? inviteInputs : null}
        <hr />
        <button
          type='button'
          className='btn btn-success mb-4'
          onClick={this.onRequestClick}
        >
          <h3 className='mb-4'>Request</h3>
        </button>
        {displayRequestForm ? requestInputs : null}
      </div>
    );
  }
}

ProfileActions.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getCurrentUserGroups: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,

  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    createInviteMessage,
    createRequestMessage,
    getProfileByHandle,
    getCurrentUserGroups
  }
)(withRouter(ProfileActions));
