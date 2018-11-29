import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { deleteRequest } from "../../actions/requestActions";

class RequestItem extends Component {
  onDeleteClick(id) {
    this.props.deleteRequest(id, this.props.history);
  }

  render() {
    const { request, showActions } = this.props;
    const { user } = this.props.auth;
    console.log(user.id);

    let requestItemContent;

    if (request.user === user.id && request.requestValue === "request") {
      requestItemContent = (
        <div className="card card-body red-bkd mb-3">
          <div className="row">
            <div className="col-md-2">
              <p className="text-center">
                You made a request to {request.handle}
              </p>
            </div>
            <div className="col-md-10">
              <p className="lead">{request.message}</p>
              {showActions ? (
                <span>
                  <Link
                    to={`/request/${request.request}`}
                    className="btn btn-success mr-1"
                  >
                    Add Comment
                  </Link>

                  <button
                    onClick={this.onDeleteClick.bind(this, request.request)}
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
    } else {
      if (request.requestValue === "request") {
        requestItemContent = (
          <div className="card card-body red-bkd mb-3">
            <div className="row">
              <div className="col-md-2">
                <p className="text-center">
                  New request from {request.username}
                </p>
              </div>
              <div className="col-md-10">
                <p className="lead">{request.message}</p>
                {showActions ? (
                  <span>
                    <Link
                      to={`/request/${request.request}`}
                      className="btn btn-success mr-1"
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
      } else {
        if (request.user === user.id && request.requestValue === "invite") {
          requestItemContent = (
            <div className="card card-body red-bkd mb-3">
              <div className="row">
                <div className="col-md-2">
                  <p className="text-center">
                    You invited {request.handle} to your group
                  </p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{request.message}</p>
                  {showActions ? (
                    <span>
                      <Link
                        to={`/request/${request.request}`}
                        className="btn btn-success mr-1"
                      >
                        Add Comment
                      </Link>

                      <button
                        onClick={this.onDeleteClick.bind(this, request.request)}
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
        } else {
          requestItemContent = (
            <div className="card card-body red-bkd mb-3">
              <div className="row">
                <div className="col-md-2">
                  <p className="text-center">
                    New group invite from {request.username}
                  </p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{request.message}</p>
                  {showActions ? (
                    <span>
                      <Link
                        to={`/request/${request.request}`}
                        className="btn btn-success mr-1"
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
    }

    return <div>{requestItemContent}</div>;
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
)(withRouter(RequestItem));
