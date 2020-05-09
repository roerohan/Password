import React, { useState } from 'react';
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
        <div className="messages">
          <ul>{renderMessages()}</ul>
        </div>
        <Form onSubmit={sendMessage}>
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
  // eslint-disable-next-line react/forbid-prop-types
  messageList: propTypes.array.isRequired,
};

export default Chat;
