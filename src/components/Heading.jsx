import React from 'react';
import TitleImage from '../assets/images/title.png';

import '../assets/css/Heading.css';

function Heading() {
  return (
    <div className="heading">
      <div className="title">
        <img src={TitleImage} alt="PASSWORD" className="title-img" />
      </div>
      <div className="subtitle">Guess it to win it!</div>
    </div>
  );
}

export default Heading;
