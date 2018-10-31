import React, { Component } from "react";
import PropTypes from "prop-types";
import GroupItem from "./GroupItem";

class GroupFeed extends Component {
  render() {
    const { profile } = this.props;

    return profile.groups.map(group => (
      <GroupItem key={group._id} group={group} />
    ));
  }
}

GroupFeed.propTypes = {
  profile: PropTypes.object.isRequired
};

export default GroupFeed;
