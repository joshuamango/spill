import React, { useState } from "react";
import $ from 'jquery';

const LoginPage = () => {
  const [username, setUsername] = useState("");

  const callApi = async e => {
    e.preventDefault();
    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: username })
    })
      .then(res => res.json())
      .then(res => {
        if (res.login) {
          window.location.href = window.location.href + "app";
        } 
        else {
          console.log('HELLLOOOOOO')
          $('#newUserModal').modal('toggle')
        }
      })
      .catch(error => console.log(error));
  };

  const addUser = async e => {
    e.preventDefault();
    const response = await fetch("/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: username })
    }).catch(error => console.log(error));
    const body = await response.text();
    console.log(`New User Response: ${body}`)
  };

  return (
    <div>
      <div class="modal fade" id="newUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">New User</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Would you like to create a new account?
      </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Create</button>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-light bg-light">
        <h1 className="navbar-brand">Spill</h1>
        <button className="btn btn-outline-dark" type="button">
          About
        </button>
      </nav>
      <div className="jumbotron jumbotron-fluid header-image">
        <center>
          <h1 className="display-4 jumbotron-text">
            Access your notes
            <br /> <em>wherever </em>
            you are
          </h1>
        </center>
      </div>
      <center>
        <div className="form-group">
          <label htmlFor="usernameInput">Username</label>
          <input
            className="form-control"
            id="usernameInput"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <button className="btn btn-dark" onClick={e => callApi(e)}>
          Login / Create User
        </button>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newUserModal">
          Launch demo modal
        </button> 
      </center>
    </div>
  );
};

export default LoginPage;
