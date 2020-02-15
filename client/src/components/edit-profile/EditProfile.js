import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { createProfile } from '../../actions/profileActions';
import Axios from 'axios';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      thing: '',
      selectedFile: null,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageChange = this.fileChangedHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      'image',
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    const profileData = {
      handle: this.state.handle,
      thing: this.state.thing,
      selectedFile: this.state.selectedFile.name
    };
    console.log(this.state.selectedFile.name);
    console.log(profileData);
    Axios.post('/api/profile', this.state.selectedFile);
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  fileChangedHandler(e) {
    this.setState({ selectedFile: e.target.files[0] });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Create Your Profile</h1>
              <small className='d-block pb-3'>* = required fields</small>
              <form onSubmit={this.onSubmit} encType='multipart/form-data'>
                <TextFieldGroup
                  placeholder='* Profile Handle'
                  name='handle'
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info='A unique handle for your profile.'
                />
                <TextFieldGroup
                  placeholder='Thing'
                  name='thing'
                  value={this.state.thing}
                  onChange={this.onChange}
                  error={errors.thing}
                  info='Enter a cool thing about you.'
                />
                <input
                  placeholder='Upload image'
                  name='image'
                  type='file'
                  onChange={this.onImageChange}
                  error={errors.image}
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
