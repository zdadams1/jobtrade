import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import InputGroup from "../common/InputGroup";
import { getCurrentProfile } from "../../actions/profileActions";
import { addToGroup, createGroup } from "../../actions/groupActions";
import { withRouter } from "react-router-dom";

class GroupActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupname: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onNewGroupRequestSubmit = this.onNewGroupRequestSubmit.bind(this);
    this.onInviteSubmit = this.onInviteSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onInviteSubmit(e) {
    e.preventDefault();
    const { request } = this.props;
    const { user } = this.props.auth;
    console.log(request.groupId);

    const invData = {
      groupId: request.groupId,
      user: user._id
    };

    this.props.addToGroup(invData, this.props.history);
  }

  onNewGroupRequestSubmit(e) {
    e.preventDefault();
    const { request } = this.props;
    console.log(request.user);

    const groupData = {
      groupname: this.state.groupname,
      requestee: request.user
    };

    this.props.createGroup(groupData, this.props.history);
  }
  render() {
    const { requestId, profile, loading, request } = this.props;
    const { errors } = this.state;

    let groupActionContent;

    if (request.requestValue === "invite") {
      groupActionContent = (
        <div className="join-group-btn">
          <form onSubmit={this.onInviteSubmit}>
            <button type="submit" className="btn btn-success">
              Join Group
            </button>
          </form>
        </div>
      );
    }
    if (request.requestValue === "request") {
      if (profile.groups === null || loading) {
        groupActionContent = <Spinner />;
      }
      if (profile.groups === undefined) {
        groupActionContent = (
          <div className=" request-action">
            <form onSubmit={this.onNewGroupRequestSubmit}>
              <h3 className="request-action-header">
                Create a group!
              </h3>
              <InputGroup
                placeholder="Group name"
                name="groupname"
                value={this.state.groupname}
                onChange={this.onChange}
                error={errors.group}
              />
              <button type="submit" className="btn btn-success">
                Create new Group
              </button>
            </form>
          </div>
        );
      } else {
        groupActionContent = (
          <div>
            <form onSubmit={this.onAddToGroupRequestSubmit}>
              {/*add group select*/}
              <button type="submit" className="btn btn-success">
                Add to Group
              </button>
            </form>
          </div>
                        <h3 className="request-action-header">
                        Create a group!
                      </h3>
                      <InputGroup
                        placeholder="Group name"
                        name="groupname"
                        value={this.state.groupname}
                        onChange={this.onChange}
                        error={errors.group}
                      />
                      <button type="submit" className="btn btn-success">
                        Create new Group
                      </button>
        );
      }
    }

    return <div>{groupActionContent}</div>;
  }
}

GroupActions.propTypes = {
  addToGroup: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createGroup: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addToGroup, createGroup, getCurrentProfile }
)(withRouter(GroupActions));
