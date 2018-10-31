import React, { Component } from "react";
import PropTypes from "prop-types";
import RequestItem from "./RequestItem";

class RequestFeed extends Component {
  render() {
    const { profile } = this.props;
    return profile.requests.map(request => (
      <RequestItem key={request._id} request={request} />
    ));
  }
}

RequestFeed.propTypes = {
  profile: PropTypes.object.isRequired
};

export default RequestFeed;
