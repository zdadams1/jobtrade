import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import TextFieldGroup from '../common/TextFieldGroup';
import NewItemForm from './NewItemForm';

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      market: {},
      items: [],
      errors: {},
    };
  }

  componentDidMount() {
    const corrected = this.props.match.params.locname.replace(' ', '%20');
    const url = `/api/item/${corrected}`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        if (!data) {
          this.setState({ market: null, items: null });
        } else {
          this.setState({ market: data, items: data.items });
        }
      });
  }

  render() {
    const { market, loading, errors } = this.state;
    console.log(this.state.items);
    let marketContent;

    if (market === loading) {
      marketContent = <Spinner />;
    }
    if (market === null) {
      marketContent = <NewItemForm />;
    } else {
      marketContent = (
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-sm-12'>
              <h1 className='text-center'>{market.locname}</h1>
              <button
                data-toggle='collapse'
                href='#itemform'
                className='btn btn-primary'
                aria-expanded='false'
                aria-controls='collapse'
              >
                Add
              </button>
              <div className='itemform collapse' id='itemform'>
                <NewItemForm />
              </div>
              <div id='market'>
                <div className='card'>
                  <div className='messages bg-primary'>
                    {' '}
                    {this.state.items.map((item) => {
                      return (
                        <div key={item._id}>
                          <ul>
                            <li>{item.itemname}</li>
                            <li>{item.itemdescription}</li>
                            <li>{item.itemdescription}</li>
                            <li>From: {item.user}</li>
                            <li>{item.itemprice}</li>
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
            <div className='col-md-12'>{marketContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Market.propTypes = {
  // addMessageToChat: PropTypes.func.isRequired,
  market: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  market: state.market,
  auth: state.auth,
});

export default connect(mapStateToProps)(Market);
