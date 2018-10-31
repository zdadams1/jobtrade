import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteRequest } from "../../actions/profileActions";

class RequestItem extends Component {
  onDeleteClick(id) {
    this.props.deleteRequest(id);
  }

  render() {
    const { request, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <p className="text-center">New request from {request.username}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{request.message}</p>
            {showActions ? (
              <span>
                <Link
                  to={`/request/${request._id}`}
                  className="btn btn-info mr-1"
                >
                  Respond
                </Link>

                <button
                  onClick={this.onDeleteClick.bind(this, request._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

RequestItem.defaultProps = {
  showActions: true
};

RequestItem.propTypes = {
  deleteRequest: PropTypes.func.isRequired,

  request: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteRequest }
)(RequestItem);
