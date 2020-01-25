import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RequestItem from '../requests/RequestItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

import Spinner from '../common/Spinner';
import { getRequest } from '../../actions/requestActions';

class Request extends Component {
  componentDidMount() {
    this.props.getRequest(this.props.match.params.id);
  }

  render() {
    const { request, loading } = this.props.request;
    const { user } = this.props.auth;

    let requestContent;

    if (
      request === null ||
      loading ||
      Object.keys(request).length === 0 ||
      request === undefined
    ) {
      requestContent = <Spinner />;
    } else {
      if (request.user === user.id && request.requestValue === 'request') {
        requestContent = (
          <div>
            <RequestItem request={request} showActions={false} />
            <CommentForm
              requestId={request._id}
              request={request}
              placeholder='Add comment to your request'
            />
            <CommentFeed requestId={request._id} comments={request.comments} />
            <div className='request-action' />
          </div>
        );
      } else {
        if (request.user === user.id && request.requestValue === 'invite') {
          requestContent = (
            <div>
              <RequestItem request={request} showActions={false} />
              <CommentForm
                requestId={request._id}
                request={request}
                placeholder='Add comment to your invite'
              />
              <CommentFeed
                requestId={request._id}
                comments={request.comments}
              />
              <div className='request-action' />
            </div>
          );
        }
        if (request.requestValue === 'request' && request.user != user.id) {
          requestContent = (
            <div>
              <RequestItem request={request} showActions={false} />
              <CommentForm
                requestId={request._id}
                placeholder='Reply to request'
                request={request}
              />
              <CommentFeed
                requestId={request._id}
                comments={request.comments}
              />
            </div>
          );
        }
        if (request.requestValue === 'invite' && request.user != user.id) {
          requestContent = (
            <div>
              <RequestItem request={request} showActions={false} />
              <CommentForm
                requestId={request._id}
                placeholder='Reply to invite'
                request={request}
              />
              <CommentFeed
                requestId={request._id}
                comments={request.comments}
              />
            </div>
          );
        }
      }
    }
    return (
      <div className='post'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>{requestContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Request.propTypes = {
  getRequest: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  request: state.request,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getRequest }
)(Request);
