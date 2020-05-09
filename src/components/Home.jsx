import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
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

function Home(props) {
  const {
    username: appUsername,
    setUsername: liftUserName,
    setRoomId,
    setCreator,
  } = props;
  const [username, setUsername] = useState(appUsername);

  const history = useHistory();

  const handleChange = ({ target }) => setUsername(target.value);

  const handleJoin = async (e) => {
    e.preventDefault();
    const response = (await API.get('/room/join', { params: { username } })).data;
    console.log(response);
    if (!response.success) {
      console.error(response.message);
      return;
    }

    const { roomId, creator, players } = response.message;
    console.log(roomId);
    setRoomId(roomId);
    setCreator(creator);
    console.log(players);
    history.push('/play');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = (await API.post('/room/create', { username })).data;

      if (!response.success) {
        console.error(response.message);
        return;
      }

      const { roomId, creator } = response.message;
      setRoomId(roomId);
      setCreator(creator);
      history.push('/play');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    liftUserName(username);
  }, [username, liftUserName]);

  return (
    <Container className="card-holder">
      <Heading />
      <Row>
        <Col md className="d-flex flex-column justify-content-between home-card">
          <Card className="display-card card-top mb-3">
            <Card.Body className="d-flex flex-column justify-content-between">
              <div className="text-center">
                <FontAwesomeIcon icon={faUserCircle} size="4x" />
                <div className="subtitle mt-1">Choose your Avatar!</div>
              </div>
              <Form onSubmit={handleJoin}>
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
            </Card.Body>
          </Card>
          <Card className="display-card card-bottom">
            <Card.Body className="text-center d-flex flex-column justify-content-around px-5">
              <div className="bottom-content">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Play with friends!
              </div>
              <Button type="submit" variant="primary" className="create-button" onClick={handleCreate}>CREATE PRIVATE ROOM!</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="home-card">
          <Card className="display-card card-right p-4">
            <Card.Header className="subtitle">Instructions:</Card.Header>
            <Card.Body>
              <ol className="instructions">
                <li>
                  A random word, the &lsquo;password&rsquo;,
                  will be generated and displayed to a player.
                </li>
                <li>The player will type a word related to the password.</li>
                <li>Rest of the players will have to guess the &lsquo;password&rsquo;.</li>
                <li>The earlier you guess, the higher you score.</li>
                <li>Hints will be displayed in 15 seconds intervals.</li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

Home.propTypes = {
  username: propTypes.string.isRequired,
  setUsername: propTypes.func.isRequired,
  setRoomId: propTypes.func.isRequired,
  setCreator: propTypes.func.isRequired,
};

export default Home;
