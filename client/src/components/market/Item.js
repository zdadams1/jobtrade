import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { deleteItem } from '../../actions/itemActions';

class Item extends Component {
  onDeleteClick(id) {
    this.props.deleteItem(id, this.props.history);
  }

  render() {
    const { item, showActions } = this.props;
    const { user } = this.props.auth;
    console.log(user.id);

    let itemContent;

    if (item.user === user.id) {
      itemContent = (
        <div className='card card-body red-bkd mb-3'>
          <div className='row'>
            <div className='col-md-2'>
              <p className='text-center'>{item.itemname}</p>
            </div>
            <div className='col-md-10'>
              <p className='lead'>{item.itemdescription}</p>
              <img>{item.itemimage}</img>
              <p>{item.itemprice}</p>
              {showActions ? (
                <span>
                  <button
                    onClick={this.onDeleteClick.bind(this, item.item)}
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
      itemContent = (
        <div className='card card-body red-bkd mb-3'>
          <div className='row'>
            <div className='col-md-2'>
              <p className='text-center'>{item.itemname}</p>
            </div>
            <div className='col-md-10'>
              <p className='lead'>{item.itemdescription}</p>
              <img>{item.itemimage}</img>
              <p>{item.itemprice}</p>
              {showActions ? (
                <span>
                  <button>Buy</button>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      );
    }

    return <div>{itemContent}</div>;
  }
}

Item.defaultProps = {
  showActions: true
};

Item.propTypes = {
  deleteItem: PropTypes.func.isRequired,

  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteItem })(withRouter(Item));
