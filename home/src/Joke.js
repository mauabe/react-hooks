import React, { useEffect, useState } from "react";

function Joke() {
  const [joke, setJoke] = useState({});
  useEffect(() => {
    fetch("https://official-jokes-api.appspot.com/jokes.random")
      .then(response => response.json())
      .then(json => {
        console.log("joke json", json)
        setJoke(json);
      })
      .catch(error => console.log("Pardon me, there's an error: ", error));
  }, []);

  return (
    <div>
      <h3>Joke</h3>
      {/* <p>{setup}</p>
      <p><em>{punchline}</em></p> */}
    </div>
  )
}

export default Joke;
