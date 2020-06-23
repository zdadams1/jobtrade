import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { getCurrentProfile } from '../../actions/profileActions';
import { createItem } from '../../actions/itemActions';

class NewItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemname: '',
      itemcategory: '',
      itemimage: '',
      itemdescription: '',
      itemprice: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { profile } = this.props.profile;

    const itemData = {
      itemname: this.state.itemname,
      itemcategory: this.state.itemcategory,
      itemimage: this.state.itemimage,
      itemdescription: this.state.itemdescription,
      itemprice: this.state.itemprice,
      locname: profile.locname
    };

    this.props.createItem(itemData, this.props.history);
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
              <h1 className='display-4 text-center'>Add Item</h1>
              <small className='d-block pb-3'>* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='* Name'
                  name='itemname'
                  value={this.state.itemname}
                  onChange={this.onChange}
                  error={errors.name}
                  info='Name.'
                />
                <TextFieldGroup
                  placeholder='category'
                  name='itemcategory'
                  onChange={this.onChange}
                  value={this.state.itemcategory}
                  error={errors.category}
                  info='Pick a product category'
                />
                <TextFieldGroup
                  placeholder='image'
                  name='itemimage'
                  value={this.state.itemimage}
                  onChange={this.onChange}
                  error={errors.image}
                  info='Upload a picture.'
                />
                <TextFieldGroup
                  placeholder='description'
                  name='itemdescription'
                  onChange={this.onChange}
                  value={this.state.itemdescription}
                  error={errors.description}
                  info='Describe '
                />
                <TextFieldGroup
                  placeholder='price'
                  name='itemprice'
                  onChange={this.onChange}
                  value={this.state.itemprice}
                  error={errors.price}
                  info='Set a price'
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

NewItemForm.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { createItem, getCurrentProfile })(
  withRouter(NewItemForm)
);
