// src/MyApp.jsx
import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index, id) {
    fetch(`Http://localhost:8000/users/${id}`, {
      method: "DELETE"
    })
    .then((res) => {
      if(res.status === 204) {
        const updated = characters.filter((character, i) => i !== index);
        setCharacters(updated);
      } else {
       console.log("Failed to delete user: status", res.status)
      }
    })
    .catch((error) => {
      console.log("Error:", error.message);
    });
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    return fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      } else {
        throw new Error("Failed to add User");
      }
    })
    .then((person) => {
      updateList(person);
    })
    .catch((error) => {
      console.log("Error:", error.message);
    });
  }

  return (
    <div className="container">
      <Table 
        characterData={characters} 
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={(person) => postUser(person)} />
    </div>
  );
}

export default MyApp;

