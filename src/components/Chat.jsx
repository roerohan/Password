import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import propTypes from 'prop-types';

import GameCard from './GameCard';
import '../assets/css/Chat.css';

function Chat(props) {
  const {
    sendMessage: sm,
    messageList,
  } = props;

  const [message, setMessage] = useState('');

  const handleChange = ({ target }) => setMessage(target.value);

  const sendMessage = (e) => {
    e.preventDefault();
    sm(message);
    setMessage('');
  };

  useEffect(() => {
    const messages = document.getElementsByClassName('messages')[0];
    messages.scrollTop = messages.scrollHeight;
  }, [messageList]);

  const renderMessages = () => (
    messageList.map((msg) => (
      <li key={msg.time}>
        <strong>{msg.username}</strong>
        :
        {' '}
        &nbsp;
        {msg.message}
        {msg.key}
      </li>
    ))
  );

  return (
    <GameCard className="chat">
      <GameCard.Body className="d-flex flex-column justify-content-between">
        <ul className="messages mb-3">
          {renderMessages()}
        </ul>
        <Form onSubmit={sendMessage} className="send-message">
          <Row>
            <Col>
              <Form.Control type="text" placeholder="Type your guess here!" onChange={handleChange} value={message} />
            </Col>
            <Col xs="auto">
              <Button type="submit" variant="success">Send</Button>
            </Col>
          </Row>
        </Form>
      </GameCard.Body>
    </GameCard>
  );
}

Chat.propTypes = {
  sendMessage: propTypes.func.isRequired,
  messageList: propTypes.arrayOf(propTypes.shape({
    message: propTypes.string,
    username: propTypes.string,
    time: propTypes.string,
  })).isRequired,
};

export default Chat;
