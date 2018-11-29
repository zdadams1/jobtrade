import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CommentItem extends Component {
  render() {
    const { comment } = this.props;
    console.log(comment);

    return (
      <div className="card card-body red-bkd mb-3">
        <div className="row">
          <div className="col-md-2">
            <p className="text-center">{comment.username}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.message}</p>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  requestId: PropTypes.string.isRequired
};

export default CommentItem;
