import React, { useState } from 'react';
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

import '../assets/css/Home.css';

import API from '../API';
import Heading from './Heading';

function Home() {
  const [username, setUsername] = useState('');

  const handleChange = ({ target }) => {
    setUsername(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/room/create', { username });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
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
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control type="text" placeholder="Username" onChange={handleChange} />
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
              <Button type="submit" variant="primary" className="create-button">CREATE PRIVATE ROOM!</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="home-card">
          <Card className="display-card card-right p-4">
            <Card.Header className="subtitle">Instructions:</Card.Header>
            <Card.Body>
              <ol className="instructions">
                <li>
                  A random word, the &lsquo;password&rsquo;,&nbsp;
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

export default Home;
