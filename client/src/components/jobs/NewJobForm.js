import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { getCurrentProfile } from '../../actions/profileActions';
import { createJob } from '../../actions/jobActions';

class NewJobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobitemname: '',
      jobitemcategory: '',
      jobitemimage: '',
      jobitemdescription: '',
      errors: {},
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
    const { profile } = this.props.profile;

    const jobData = {
      jobitemname: this.state.jobitemname,
      jobitemcategory: this.state.jobitemcategory,
      jobitemimage: this.state.jobitemimage,
      jobitemdescription: this.state.jobitemdescription,
      locname: profile.locname,
    };

    this.props.createJob(jobData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onImageChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Create a job</h1>
              <small className='d-block pb-3'>* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='* Name'
                  name='jobitemname'
                  value={this.state.jobitemname}
                  onChange={this.onChange}
                  error={errors.name}
                  info='Name.'
                />
                <TextFieldGroup
                  placeholder='category'
                  name='jobitemcategory'
                  onChange={this.onChange}
                  value={this.state.jobitemcategory}
                  error={errors.category}
                  info='Pick a category'
                />
                <TextFieldGroup
                  placeholder='image'
                  name='jobitemimage'
                  value={this.state.jobitemimage}
                  onChange={this.onChange}
                  error={errors.image}
                  info='Upload a picture.'
                />
                <TextFieldGroup
                  placeholder='description'
                  name='jobitemdescription'
                  onChange={this.onChange}
                  value={this.state.jobitemdescription}
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
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  profile: state.profile,
});

export default connect(mapStateToProps, { createJob, getCurrentProfile })(
  withRouter(NewJobForm)
);
