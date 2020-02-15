import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

class MarketFeed extends Component {
  render() {
    const { items } = this.props;
    return items.locname.map(item => <Item key={item._id} item={item} />);
  }
}

MarketFeed.propTypes = {
  items: PropTypes.array.isRequired
};

export default MarketFeed;
