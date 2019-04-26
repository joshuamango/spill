import React, { useState, useEffect } from "react";
import Note from "./note";
import AppHeader from "./noteheader";

import "./styles.css";

function App() {
  const [notes, changeNote] = useState([]);
  const [username, changeUsername] = useState('');
  const [count, incrementCount] = useState(0);

  useEffect(() => {
    async function getUsername() {
      await fetch("/api/currentUser")
        .then(res => res.json())
        .then(res => changeUsername(res.currentUser))
    }

    async function getNotes() {
      await fetch("api/getnotes")
        .then(res => res.json())
        .then(res => {
          let savedNotes = res.list;
          let number = count;
          savedNotes.forEach(element => {
            element.key = number
            element.number = number
            number++;
          })
          console.log(savedNotes);
          changeNote(savedNotes);
          console.log(`${res.list.length} notes in database`)
          incrementCount(number + 1);
        })
    }

    getUsername();
    getNotes();
  }, [])

  return (
    <div className="App">
      <AppHeader add={addNote} user={username} />
      <center>
        {notes.map(note => {
          return (
            <Note
              key={note.key}
              number={note.key}
              removal={removeNote}
              time={note.time}
              title={note.title}
              body={note.body}
            />
          );
        })}
        <div className="fab" onClick={addNote}> + </div>
      </center>
    </div>
  );

  function removeNote(noteKey) {
    let newNotes = notes.filter(item => item.key !== noteKey);
    changeNote(newNotes);

    async function removeFromDatabase() {
      await fetch('/api/delete', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ key: noteKey })
      }).catch(error => console.error(error))
    }

    removeFromDatabase();
  }

  function addNote(title = null, body = null, time = Date.now()) {
    let newNote = {
      key: count,
      number: count,
      title: title,
      body: body,
      time: time
    };

    incrementCount(count + 1);

    let newNotes = notes;

    newNotes.push(newNote);
    changeNote(newNotes);
  }
}

export default App;