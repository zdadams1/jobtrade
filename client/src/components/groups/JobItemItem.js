import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteJobItem } from '../../actions/jobItemActions';

class JobItemItem extends Component {
  onDeleteClick(id) {
    this.props.deleteJobItem(id);
  }

  render() {
    const { jobItem, auth, showActions } = this.props;

    return (
      <div className='card card-body red-bkd mb-3'>
        <div className='row'>
          <div className='col-md-12'>
            <h3>{jobItem.name}</h3>
          </div>
          <div className='col-md-12'>
            {showActions ? (
              <span>
                <Link
                  to={`/job-items/${jobItem._id}`}
                  className='btn btn-success mr-1'
                >
                  Chat
                </Link>
                {jobItem.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, jobItem._id)}
                    type='button'
                    className='btn btn-danger mr-1'
                  >
                    <i className='fas fa-times' />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

JobItemItem.defaultProps = {
  showActions: true
};

JobItemItem.propTypes = {
  deleteJobItem: PropTypes.func.isRequired,
  jobItem: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteJobItem }
)(JobItemItem);
