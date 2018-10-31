import React, { Component } from "react";
import PropTypes from "prop-types";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

import {
  getProfileByHandle,
  createInviteMessage,
  createRequestMessage,
  getCurrentProfile
} from "../../actions/profileActions";
import { getGroups } from "../../actions/groupActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ProfileActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInviteForm: false,
      displayRequestForm: false,
      handle: "",
      group: "",
      message: "",
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
    const { user } = this.props.auth;
    const id = user.id;
    const groups = this.props.getGroups(id);

    console.log(groups);

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

  onInviteSubmit(e) {
    e.preventDefault();
    const { profile } = this.props;
    console.log(profile);

    const reqData = {
      message: this.state.message,
      requestvalue: "invite",
      groupId: this.state.group,
      handle: profile.profile.handle
    };

    this.props.createInviteMessage(reqData, this.props.history);
  }

  onRequestSubmit(e) {
    e.preventDefault();
    const { profile } = this.props;
    console.log(profile);

    const reqData = {
      message: this.state.message,
      requestvalue: "request",
      handle: profile.profile.handle
    };

    this.props.createRequestMessage(reqData, this.props.history);
  }

  render() {
    const { errors, displayInviteForm, displayRequestForm } = this.state;
    const { groups } = this.props;

    let inviteInputs;
    let requestInputs;

    if (displayInviteForm) {
      if (groups === null || groups === undefined) {
        inviteInputs = <h3>You are not in a group yet.</h3>;
      } else {
        const options = groups.map(group => {
          label: `${group.name}`;
          value: group._id;
        });
        const mappedOptions = options.toArray();
        inviteInputs = (
          <div>
            <form onSubmit={this.onInviteSubmit}>
              <SelectListGroup
                placeholder="Select group to add to"
                name="groupId"
                value={this.state.group}
                options={mappedOptions}
                onChange={this.onChange}
              />
              <InputGroup
                placeholder="Hey, want to join my group?"
                name="message"
                value={this.state.message}
                onChange={this.onChange}
              />

              <input
                type="submit"
                value="Submit"
                className="btn btn-success btn-block mt-4"
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
              placeholder="Hey, do you have a group I could join, or do you want to start one?"
              name="message"
              value={this.state.message}
              onChange={this.onChange}
              error={errors.request}
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-success btn-block mt-4"
            />
          </form>
        </div>
      );
    }

    return (
      <div ref="myRef">
        <hr />
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={this.onInviteClick}
        >
          <h3 className="mb-4">Invite</h3>
        </button>
        {displayInviteForm ? inviteInputs : null}
        <hr />
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={this.onRequestClick}
        >
          <h3 className="mb-4">Request</h3>
        </button>
        {displayRequestForm ? requestInputs : null}
      </div>
    );
  }
}

ProfileActions.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
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
    getGroups
  }
)(withRouter(ProfileActions));
