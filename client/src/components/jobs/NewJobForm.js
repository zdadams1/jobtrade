import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

import { createJob } from '../../actions/jobActions';

class NewJobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobname: '',
      jobcategory: '',
      jobimage: '',
      jobdescription: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const jobData = {
      jobname: this.state.jobname,
      jobcategory: this.state.jobcategory,
      jobimage: this.state.jobimage,
      jobdescription: this.state.jobdescription
    };

    this.props.createJob(jobData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onImageChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Create Your Profile</h1>
              <small className='d-block pb-3'>* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='* Name'
                  name='jobname'
                  value={this.state.jobname}
                  onChange={this.onChange}
                  error={errors.name}
                  info='Name.'
                />
                <TextFieldGroup
                  placeholder='category'
                  name='jobcategory'
                  onChange={this.onChange}
                  value={this.state.jobcategory}
                  error={errors.category}
                  info='Pick a category'
                />
                <TextFieldGroup
                  placeholder='image'
                  name='jobimage'
                  value={this.state.jobimage}
                  onChange={this.onChange}
                  error={errors.image}
                  info='Upload a picture.'
                />
                <TextFieldGroup
                  placeholder='description'
                  name='jobdescription'
                  onChange={this.onChange}
                  value={this.state.jobdescription}
                  error={errors.description}
                  info='Describe '
                />

                <input
                  type='submit'
                  value='Submit'
                  className='btn btn-success btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewJobForm.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createJob })(withRouter(NewJobForm));
