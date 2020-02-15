import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { deleteJob } from '../../actions/jobActions';

class Job extends Component {
  onDeleteClick(id) {
    this.props.deleteRequest(id, this.props.history);
  }

  render() {
    const { job, showActions } = this.props;
    const { user } = this.props.auth;
    console.log(user.id);

    let jobContent;

    if (job.user === user.id) {
      jobContent = (
        <div className='card card-body red-bkd mb-3'>
          <div className='row'>
            <div className='col-md-2'>
              <p className='text-center'>{job.jobname}</p>
            </div>
            <div className='col-md-10'>
              <p className='lead'>{job.jobdescription}</p>
              <img>{job.jobimage}</img>
              {showActions ? (
                <span>
                  <button
                    onClick={this.onDeleteClick.bind(this, job.job)}
                    type='button'
                    className='btn btn-danger mr-1'
                  >
                    <i className='fas fa-times' />
                  </button>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      );
    } else {
      jobContent = (
        <div className='card card-body red-bkd mb-3'>
          <div className='row'>
            <div className='col-md-2'>
              <p className='text-center'>{job.jobname}</p>
            </div>
            <div className='col-md-10'>
              <p className='lead'>{job.jobdescription}</p>
              <img>{job.jobimage}</img>
              {showActions ? (
                <span>
                  {/* <button
                        onClick={this.onSendMessage.bind(this, job.job)}
                        type="button"
                        className="btn btn-danger mr-1"
                      >
                        <i className="fas fa-times" />
                      </button> */}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      );
    }

    return <div>{jobContent}</div>;
  }
}

Job.defaultProps = {
  showActions: true
};

Job.propTypes = {
  deleteJob: PropTypes.func.isRequired,

  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteJob })(withRouter(Job));
