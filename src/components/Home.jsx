import React, { useState } from 'react';
import API from '../API';

function Home() {
  const [username, setUsername] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/room/create', username);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Home;
