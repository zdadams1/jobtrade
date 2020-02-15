import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getChatByName } from '../../actions/chatActions';
import io from 'socket.io-client';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: {},
      message: '',
      messages: []
    };
    this.socket = io('localhost:5000');
    this.sendMessage = this.sendMessage.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.socket.on('RECEIVE_MESSAGE', function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };
  }

  componentDidMount() {
    const corrected = this.props.match.params.locname.replace(' ', '%20');
    const url = `/api/chat/${corrected}`;
    axios
      .get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({ chat: data });
        console.log(this.state.chat);
      });
  }

  sendMessage = ev => {
    ev.preventDefault();
    const { user } = this.props.auth;
    this.socket.emit('SEND_MESSAGE', {
      user: user.id,
      message: this.state.message
    });
    this.setState({ message: '' });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { chat, loading } = this.state;
    const { user } = this.props.auth;
    console.log(chat.locname);

    let chatContent;

    if (chat === null || loading) {
      chatContent = <Spinner />;
    } else {
      chatContent = (
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-sm-12'>
              <h1 className='text-center'>{chat.locname}</h1>
              <div id='status'></div>
              <div id='chat'>
                <div className='card'>
                  <div className='messages'>
                    {this.state.messages.map(message => {
                      return (
                        <div key={message.id}>
                          {message.user}: {message.message}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <br />
                <textarea
                  id='textarea'
                  onChange={this.onChange}
                  className='form-control'
                  placeholder='Enter message...'
                ></textarea>

                <button
                  onClick={this.sendMessage}
                  className='btn btn-primary form-control'
                >
                  Send
                </button>
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
            <div className='col-md-12'>{chatContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  getChatByName: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat,
  auth: state.auth
});

export default connect(mapStateToProps, { getChatByName })(Chat);
