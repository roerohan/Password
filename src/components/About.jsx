import React from 'react';
import { Container } from 'react-bootstrap';

import GameCard from './GameCard';

import '../assets/css/About.css';
import Heading from './Heading';

function About() {
  return (
    <Container className="mt-2">
      <Heading />
      <GameCard className="w-75 text-center mx-auto mt-5 about">
        <GameCard.Header className="about-header">
          What is Password?
        </GameCard.Header>
        <GameCard.Body>
          Password is an open source game born out of
          {' '}
          <strong>boredom</strong>
          {' '}
          and
          {' '}
          <strong>joblessness</strong>
          , inspired by The Tonight Show by Jimmy Fallon, which you can check out
          {' '}
          <a href="https://www.youtube.com/playlist?list=PLykzf464sU9_Jpya6uBdMuq_2CvxR0PnO">here</a>
          .
          <br />
          <br />
          If you have nothing better to do, pls contribute:
          <div>
            Frontend:
            {' '}
            <a href="https://github.com/roerohan/Password">https://github.com/roerohan/Password</a>
            <br />
            Backend:
            {' '}
            <a href="https://github.com/roerohan/PasswordGame">https://github.com/roerohan/PasswordGame</a>
          </div>
        </GameCard.Body>
      </GameCard>
    </Container>
  );
}

export default About;
