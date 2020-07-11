import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textvalue: '',
      notes: [],
      currentUser: ''
    };
  }

  getNewNotes = async (e) => {
    e.preventDefault();
    await fetch("/api/getnotes")
      .then(res => res.json())
      .then(res => this.setState({ notes: res.messagesList }))
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    await fetch("/api/currentUser")
      .then(res => res.json())
      .then(res => this.setState({ currentUser: res.currentUser }))
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/savenote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.textvalue })
    }).catch(error => console.log(error));
    const body = await response.text();
    console.log(body);
  };

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <h1 className="navbar-brand">
            <a style={{color: "white"}} href={window.location.href.substring(0, window.location.href.length - 3)}>Spill</a>
          </h1>
          <p style={{colr: "white"}}>Logged in as: {this.state.currentUser}</p>
          <a href="https://www.github.com/joshuamango/spill" className="btn btn-outline-dark" role="button">
          About
        </a>
        </nav>
        <center>
          <h3>New Note:</h3>
          <textarea
            rows="20"
            cols="100"
            onChange={(e) => { this.setState({ textvalue: e.target.value }) }}
          ></textarea><br />
          <button
            className="btn btn-dark"
            onClick={e => {
              this.handleSubmit(e)
            }}
          >Save Note</button>
          <button
            style={{ marginLeft: "10px" }}
            className="btn btn-dark"
            onClick={e => {
              this.getNewNotes(e);
            }}
          >Get Notes
          </button>
          <h3 style={{ marginTop: "20px" }}>Saved Notes</h3>
          <ul
            className="list-group list-group"
            style={{ width: "250px" }}
          >{this.state.notes.map(note => (
            <li className="list-group-item" key={note}>
              {note}
            </li>
          ))}
          </ul>
        </center>
      </div>
    );
  }
}

export default App;
