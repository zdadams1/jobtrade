import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Job from './Job';

class JobsFeed extends Component {
  render() {
    const { jobs } = this.props;
    if (!jobs) {
      return;
    }
    return jobs.map(job => <Job key={job._id} job={job} />);
  }
}

JobsFeed.propTypes = {
  job: PropTypes.object.isRequired
};

export default JobsFeed;
