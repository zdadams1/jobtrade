import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getChatByName, addMessageToChat } from '../../actions/chatActions';
import io from 'socket.io-client';
import TextFieldGroup from '../common/TextFieldGroup';
import { getCurrentProfile } from '../../actions/profileActions';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: {},
      message: '',
      messages: [],
      errors: {},
    };
    this.socket = io('localhost:5000');
    this.sendMessage = this.sendMessage.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.socket.on('RECEIVE_MESSAGE', function (data) {
      addMessage(data);
    });

    const addMessage = (data) => {
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
      .then((response) => response.data)
      .then((data) => {
        console.log(data.messages);
        this.setState({ chat: data, messages: data.messages });
        console.log(this.state.chat);
      });
    this.props.getCurrentProfile();
  }

  sendMessage = (ev) => {
    ev.preventDefault();
    const { profile } = this.props.profile;
    const { chat } = this.state;
    const chatData = {
      user: profile.handle,
      locname: chat.locname,
      message: this.state.message,
    };
    this.socket.emit('SEND_MESSAGE', {
      user: profile.handle,
      message: this.state.message,
    });
    this.props.addMessageToChat(chatData);
    this.setState({ message: '' });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { chat, loading, errors } = this.state;
    const { profile } = this.props;
    console.log(chat.messages);
    const messages = chat.messages;

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
                  <div className='messages bg-primary'>
                    {' '}
                    {this.state.messages.map((message) => {
                      return (
                        <div key={message._id}>
                          {profile.handle}: {message.message}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <br />

                <TextFieldGroup
                  placeholder='message'
                  name='message'
                  value={this.state.message}
                  onChange={this.onChange}
                  error={errors.message}
                  info='Send message to chat.'
                />

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
  addMessageToChat: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  chat: state.chat,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getChatByName,
  addMessageToChat,
})(Chat);
