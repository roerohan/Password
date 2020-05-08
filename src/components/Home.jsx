import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from 'react-bootstrap';

import '../assets/css/Home.css';
import API from '../API';

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
      <div className="heading">Heading</div>
      <Row className="home-cards">
        <Col md className="d-flex flex-column justify-content-between">
          <Card className="display-card card-top mb-3">
            <Card.Body>
              <div className="avatar">Avatar</div>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control inline type="text" placeholder="Username" onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Control as="select">
                    <option>English</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="text-center">
                  <Button type="submit" variant="success">PLAY!</Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <Card className="display-card card-bottom">
            <Card.Body>
              left
            </Card.Body>
          </Card>
        </Col>
        <Col className="">
          <Card className="display-card card-right">
            <Card.Body>
              right
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
