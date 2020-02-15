import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewJobForm from './NewJobForm.js';
import JobsFeed from './JobsFeed.js';

import Spinner from '../common/Spinner';
import { getJobs } from '../../actions/jobActions';

class Jobs extends Component {
  componentDidMount() {
    this.props.getJobs(this.props.match.params.id);
  }

  render() {
    const { jobs, loading } = this.props.jobs;

    let jobsContent;

    if (jobs === null || loading || Object.keys(jobs).length === 0) {
      jobsContent = <Spinner />;
    } else {
      jobsContent = (
        <div>
          <NewJobForm />
          <JobsFeed jobs={jobs} showActions={false} />

          <div className='group-content' />
        </div>
      );
    }

    return (
      <div className='post'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>{jobsContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Jobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs
});

export default connect(mapStateToProps, { getJobs })(Jobs);
