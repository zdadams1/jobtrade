import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, groupId } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} groupId={groupId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  groupId: PropTypes.string.isRequired
};

export default CommentFeed;
