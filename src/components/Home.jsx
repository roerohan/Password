import React, {useState} from 'react'
import axios from 'axios'

function Home(){
  const[username,setUsername]= useState("");

   function handleInput(event){
    setUsername(event.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/room/create', username)
      .then(function (response) {
          console.log(response)
      })
      .catch(function (error) {
          console.log(error)
      }) 
}
  return(
      <div>
          <form onSubmit={handleSubmit}>
                  <input type="text" name="lastName" value={username} onChange={handleInput} required />

                  <button type="submit">Sign Up</button>
          </form>
      </div>
  );
}

export default Home;