import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import propTypes from 'prop-types';

import '../assets/css/Home.css';

import API from '../API';
import Heading from './Heading';
import GameCard from './GameCard';

function Home(props) {
  const {
    username: appUsername,
    roomId: appRoomId,
    setUsername: liftUserName,
    setHasStarted,
    setRoomId,
    setCreator,
    joinRoom,
  } = props;
  const [username, setUsername] = useState(appUsername);

  const history = useHistory();

  const handleChange = ({ target }) => setUsername(target.value);

  const liftStateFromResponse = (roomId, creator, players, hasStarted) => {
    setRoomId(roomId);
    setCreator(creator);
    liftUserName(username);
    setHasStarted(hasStarted);
    joinRoom(username, roomId, players);
    history.push(`/play/${roomId}`);
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    const response = (await API.get(`/room/join/${appRoomId}`, { params: { username } })).data;
    console.log(response);
    if (!response.success) {
      console.error(response.message);
      return;
    }

    const {
      roomId,
      creator,
      players,
      hasStarted,
    } = response.message;
    liftStateFromResponse(roomId, creator, players, hasStarted);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = (await API.post('/room/create', { username })).data;

      if (!response.success) {
        console.error(response.message);
        return;
      }

      const { roomId, creator, players } = response.message;
      liftStateFromResponse(roomId, creator, players);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="card-holder">
      <Heading />
      <Row className="justify-content-center">
        <Col md="5" className="d-flex flex-column justify-content-between home-card">
          <GameCard className="card-top mb-3">
            <GameCard.Body className="d-flex flex-column justify-content-around">
              <div className="text-center">
                <FontAwesomeIcon icon={faUserCircle} size="4x" />
                <div className="subtitle mt-1">Choose your Avatar!</div>
              </div>
              <Form className="mt-2" onSubmit={handleJoin}>
                <Form.Group>
                  <Form.Control type="text" placeholder="Username" value={username} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Control as="select">
                    <option>English</option>
                  </Form.Control>
                </Form.Group>
                <div className="text-center">
                  <Button type="submit" variant="success" className="card-button">PLAY!</Button>
                </div>
              </Form>
            </GameCard.Body>
          </GameCard>
          <GameCard className="card-bottom">
            <GameCard.Body className="text-center d-flex flex-column justify-content-around px-2">
              <div className="bottom-content">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Play with friends!
              </div>
              <Button type="submit" variant="primary" className="w-75 m-auto" onClick={handleCreate}>CREATE ROOM!</Button>
            </GameCard.Body>
          </GameCard>
        </Col>
        <Col md="5" className="home-card">
          <GameCard className="card-right p-4">
            <GameCard.Header className="subtitle">Instructions:</GameCard.Header>
            <GameCard.Body>
              <ol className="instructions">
                <li>
                  A random word, the &lsquo;password&rsquo;,
                  will be generated and displayed to a player.
                </li>
                <li>The player will type a word related to the password.</li>
                <li>Rest of the players will have to guess the &lsquo;password&rsquo;.</li>
                <li>The earlier you guess, the higher you score.</li>
                <li>You are allowed 4 hints.</li>
                <li>A hint is a single word of atmost 25 letters.</li>
                <li>More the number of hints you see, lesser the points.</li>
                <li>
                  <strong>Note:</strong>
                  {' '}
                  Check the browser console upon unexpected behaviour.
                </li>
              </ol>
            </GameCard.Body>
          </GameCard>
        </Col>
      </Row>
    </Container>
  );
}

Home.propTypes = {
  roomId: propTypes.string.isRequired,
  username: propTypes.string.isRequired,

  joinRoom: propTypes.func.isRequired,
  setRoomId: propTypes.func.isRequired,
  setCreator: propTypes.func.isRequired,
  setUsername: propTypes.func.isRequired,
  setHasStarted: propTypes.func.isRequired,
};

export default Home;
