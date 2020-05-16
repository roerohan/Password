import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import propTypes from 'prop-types';

import GameCard from './GameCard';

import '../assets/css/Settings.css';

function Settings(props) {
  const { setRounds: liftRounds } = props;
  const [rounds, setRounds] = useState(3);

  const handleChange = ({ target }) => {
    const value = Number(target.value);
    if (!Number.isInteger(value)) return;
    if (value > 9) return;
    setRounds(value);
    liftRounds(value);
  };

  return (
    <GameCard className="mb-2 settings">
      <GameCard.Header className="settings-header text-center">
        Settings
      </GameCard.Header>
      <GameCard.Body>
        <Row>
          <Col className="rounds-text"><strong>Rounds:</strong></Col>
          <Col>
            <Form.Control value={rounds} onChange={handleChange} />
          </Col>
        </Row>
      </GameCard.Body>
    </GameCard>

  );
}

Settings.propTypes = {
  setRounds: propTypes.func.isRequired,
};

export default Settings;
