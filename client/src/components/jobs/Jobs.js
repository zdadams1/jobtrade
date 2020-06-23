import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewJobForm from './NewJobForm.js';
import JobsFeed from './JobsFeed.js';
import axios from 'axios';
import { getCurrentProfile } from '../../actions/profileActions';

import Spinner from '../common/Spinner';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: {},
      jobItems: [],
      errors: {},
    };
  }
  componentDidMount() {
    const corrected = this.props.match.params.locname.replace(' ', '%20');
    const url = `/api/job-items/${corrected}`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        if (!data) {
          this.setState({ jobs: null, jobItems: null });
        } else {
          console.log(data);
          this.setState({ jobs: data, jobItems: data.jobitem });
        }
      });
  }

  render() {
    const { jobs, loading, errors } = this.state;

    let jobsContent;

    if (jobs === loading) {
      jobsContent = <Spinner />;
    }
    if (jobs === null) {
      jobsContent = <NewJobForm />;
    } else {
      jobsContent = (
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-sm-12'>
              <h1 className='text-center'>{jobs.locname}</h1>
              <button
                data-toggle='collapse'
                href='#jobitemform'
                className='btn btn-primary'
                aria-expanded='false'
                aria-controls='collapse'
              >
                Add
              </button>
              <div className='itemform collapse' id='jobitemform'>
                <NewJobForm />
              </div>
              <div id='jobs'>
                <div className='card'>
                  <div className='messages bg-primary'>
                    {' '}
                    {this.state.jobItems.map((item) => {
                      return (
                        <div key={item._id}>
                          <ul>
                            <li>{item.jobitemname}</li>
                            <li>{item.jobitemdescription}</li>
                            <li>From: {item.user}</li>
                            <li>{item.jobitemprice}</li>
                            <li>Posted: {item.date}</li>
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='profile'>
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
  jobs: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  auth: state.auth,
});

export default connect(mapStateToProps)(Jobs);
