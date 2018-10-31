import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import RequestItem from "../requests/RequestItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import GroupActions from "./GroupActions";
import Spinner from "../common/Spinner";
import { getRequest } from "../../actions/profileActions";

class Request extends Component {
  componentDidMount() {
    this.props.getRequest(this.props.match.params.id);
  }

  render() {
    const { request, loading } = this.props.request;

    let requestContent;

    if (
      request === null ||
      loading ||
      Object.keys(request).length === 0 ||
      request === undefined
    ) {
      requestContent = <Spinner />;
    } else {
      requestContent = (
        <div>
          <RequestItem request={request} showActions={false} />
          <CommentForm requestId={request._id} />
          <CommentFeed requestId={request._id} comments={request.comments} />
          <GroupActions
            requestId={request._id}
            request={request}
            requestValue={request.inviteorrequest}
          />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/requests" className="btn btn-light mb-3">
                Back
              </Link>
              {requestContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Request.propTypes = {
  getRequest: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  request: state.request
});

export default connect(
  mapStateToProps,
  { getRequest }
)(Request);
