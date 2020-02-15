import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewItemForm from './NewItemForm.js';
import MarketFeed from './MarketFeed.js';

import Spinner from '../common/Spinner';
import { getMarket } from '../../actions/itemActions';

class Market extends Component {
  componentDidMount() {
    this.props.getMarket(this.props.match.params.id);
  }

  render() {
    const { market, loading } = this.props.market;

    let marketContent;

    if (market === null || loading || Object.keys(market).length === 0) {
      marketContent = <Spinner />;
    } else {
      marketContent = (
        <div>
          <NewItemForm />
          <MarketFeed market={market} showActions={false} />

          <div className='group-content' />
        </div>
      );
    }

    return (
      <div className='post'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>{marketContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Market.propTypes = {
  getMarket: PropTypes.func.isRequired,
  market: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  market: state.market
});

export default connect(mapStateToProps, { getMarket })(Market);
