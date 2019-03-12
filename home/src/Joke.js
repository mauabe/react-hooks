import React, { useEffect, useState } from "react";

function Joke() {
  const [joke, setJoke] = useState({});
  useEffect(() => {
    fetch('https://official-joke-api.appspot.com/jokes/random')
      // .then(response => console.log(response))
      .then(response => response.json())
      .then(json => {
        console.log("joke json", json)
        setJoke(json);
      })
      .catch(error => console.log("Pardon me, there's an error: ", error));
  }, []);

const { setup, punchline } = joke;

  return (
    <div>
      <h3>Joke of the session: </h3>
      <p>{setup}</p>
      <p><em>{punchline}</em></p>
    </div>
  )
}

export default Joke;
