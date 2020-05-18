import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-bootstrap';
import propTypes from 'prop-types';

import '../assets/css/Notif.css';

function Notif(props) {
  const { alert, setAlert, setHasStarted } = props;

  const [show, setShow] = useState(alert !== '');
  const [variant, setVariant] = useState('danger');

  const handleClose = useCallback(() => {
    setShow(false);
    setAlert('');
    setVariant('danger');
  }, [setAlert]);

  useEffect(() => {
    setVariant('danger');
    if (alert === 'noRooms') {
      setAlert('The are no active rooms that you can join!');
    } else if (alert === 'usernameAlreadyExists') {
      setAlert('A user with this username already exists in this room.');
    } else if (alert === 'gameNotFound') {
      setAlert('Game with current room-id not found, please refresh the page or visit a valid link.');
    } else if (alert === 'serverError') {
      setAlert('The server ran into an error!');
    } else if (alert === 'usernameInvalid') {
      setAlert('Your username is not valid.');
    } else if (alert === 'notEnoughPlayers') {
      setAlert('Haha loner get some friends.');
    } else if (alert === 'notAdmin') {
      setAlert('Only the room creator can start the game!');
    } else if (alert === 'hintInvalid') {
      setAlert('The hint you entered is not valid. Note: The password can\'t be in the hint, spaces aren\'t allowed.');
    } else if (alert === 'gameEnded') {
      setVariant('success');
      setAlert('The game has ended!');
    } else if (alert.includes('knows the password')) {
      setVariant('success');
    }

    setShow(alert);

    const escapeListener = (event) => { if (event.keyCode === 27) handleClose(); };
    document.addEventListener('keydown', escapeListener, false);

    return () => { document.removeEventListener('keydown', escapeListener, false); };
  }, [alert, setAlert, handleClose]);

  useEffect(() => {
    if (!show) {
      return () => {};
    }

    const timeOut = setTimeout(() => {
      if (alert === 'The game has ended!') {
        setHasStarted(false);
      }
      handleClose();
    }, 5000);

    return () => { clearTimeout(timeOut); };
  }, [show, handleClose, alert, setHasStarted]);

  const renderHeading = () => {
    if (variant === 'danger') {
      return 'Oh snap! You got an error!';
    }
    return 'Hey,';
  };

  if (show) {
    return (
      <Alert variant={variant} className="error" onClose={handleClose} dismissible>
        <Alert.Heading>{renderHeading()}</Alert.Heading>
        <p>
          {alert}
        </p>
        <div className="v-small-text">
          Press Esc to close.
        </div>
      </Alert>
    );
  }

  return <></>;
}

Notif.propTypes = {
  alert: propTypes.string.isRequired,
  setAlert: propTypes.func.isRequired,
  setHasStarted: propTypes.func.isRequired,
};

export default Notif;
