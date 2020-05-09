import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import propTypes from 'prop-types';

import GameCard from './GameCard';
import '../assets/css/Chat.css';

let connected = false;

function Chat(props) {
  const {
    username,
    roomId,
    socket,
  } = props;

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (!connected) {
      socket.emit('join', {
        username,
        roomId,
      });
      connected = true;
    }

    socket.on('message', (data) => {
      const { username: u, message: m, time } = data;
      console.log(data);
      setMessageList((messageL) => messageL.concat({ username: u, message: m, time }));
    });
  });

  const handleChange = ({ target }) => setMessage(target.value);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('message', {
      username,
      roomId,
      message,
    });
    setMessage('');
  };

  const renderMessages = () => (
    messageList.map((msg) => (
      <li key={msg.time}>
        {msg.username}
        :
        {' '}
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
              <Form.Control type="text" placeholder="Username" onChange={handleChange} value={message} />
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
  username: propTypes.string.isRequired,
  roomId: propTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  socket: propTypes.object.isRequired,
};

export default Chat;
