import React, { useState, useEffect } from "react";
import { Editor, EditorState, ContentState } from 'draft-js';
import $ from 'jquery';
import 'draft-js/dist/Draft.css'

const Note = props => {
  let titleStartState;
  let bodyStartState;

  // Set up initial note state 
  if (props.body == null) {
    bodyStartState = EditorState.createEmpty();
  }
  else {
    bodyStartState = EditorState.createWithContent(ContentState.createFromText(props.body));
  }

  if (typeof props.title !== "string") {
    titleStartState = EditorState.createEmpty();
  }
  else {
    titleStartState = EditorState.createWithContent(ContentState.createFromText(props.title));
  }

  const [editorState, setEditorState] = useState(
    bodyStartState
  );

  const [titleEditorState, setTitleEditorState] = useState(
    titleStartState
  );


  // Add hover shadow event listeners
  useEffect(() => {
    let cards = document.getElementsByClassName('card');

    let myfunction = function (e) {
      e.target.classList.add('card-hover')
    }

    let otherFunction = function (e) {
      e.target.classList.remove('card-hover')
    }

    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener('mouseenter', myfunction, false);
      cards[i].addEventListener('mouseleave', otherFunction, false);
    }

    $(document).ready(() => {
      $('.savebtn').on('click', () => {
        $('.alert').show('fade');

        setTimeout(() => {
          $('.alert').hide('fade');
        }, 1500)
      })
    })

    setTitleText(editorState.getCurrentContent().getPlainText(' '))
    setBodyText(editorState.getCurrentContent().getPlainText(' '))
  }, [])


  const [time] = useState(new Date(props.time).toLocaleString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }));

  const [bodyText, setBodyText] = useState('');
  const [titleText, setTitleText] = useState('');

  return (
    <div className="card">
      <div className="card-body" style={{marginBottom: '40px'}}>
        <div className="card-title">
          <Editor
            placeholder="Title"
            editorState={titleEditorState}
            onChange={editorState => {
              setTitleEditorState(editorState)
              setTitleText(editorState.getCurrentContent().getPlainText(' '))
            }} />
          <h5 className="date-time">{time}</h5>
        </div>
        <Editor
          placeholder="Write here..."
          editorState={editorState}
          onChange={editorState => {
            setEditorState(editorState)
            setBodyText(editorState.getCurrentContent().getPlainText(' '))
          }}
        />
        <div className="icon-div"  >
          <button className="btn savebtn" onClick={(e) => {
            // Send the note to the server for saving
            sendNoteToServer();
          }}>
            <ion-icon name="save"></ion-icon>
          </button>
          <button className="btn deletebtn" onClick={() => {
            props.removal(props.number)
          }}>
            <ion-icon name="trash" />
          </button>
        </div>
      </div>
    </div>
  );

  // Used to save note to database
  async function sendNoteToServer(e) {
    await fetch('/api/savenote', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ second: bodyText, first: titleText, time: time, key: props.number })
    })
      .catch(error => console.error(error))
  }
};

export default Note;
