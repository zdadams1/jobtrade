import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import JobItemItem from '../groups/JobItemItem';

import Spinner from '../common/Spinner';
import { getJobItem } from '../../actions/jobItemActions';

class JobItem extends Component {
  componentDidMount() {
    this.props.getJobItem(this.props.match.params.id);
  }

  render() {
    const { jobItem, loading } = this.props.jobItem;

    let jobItemContent;

    if (jobItem === null || loading || Object.keys(jobItem).length === 0) {
      jobItemContent = <Spinner />;
    } else {
      jobItemContent = (
        <div>
          <JobItemItem jobItem={jobItem} showActions={false} />
          <div className='jobItem-content' />
        </div>
      );
    }

    return (
      <div className='post'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>{jobItemContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

JobItem.propTypes = {
  getJobItem: PropTypes.func.isRequired,
  jobItem: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobItem: state.jobItem
});

export default connect(
  mapStateToProps,
  { getJobItem }
)(JobItem);
