import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // If username and password are valid, route to app
  const login = async e => {
    e.preventDefault();
		if (username === "" || password === "") {
			document.getElementById('modal-button').click();
			return;
		}
    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(res => res.json())
      .then(res => {
        if (res.login) {
          window.location.href = window.location.href + "app";
        }
        else {
          document.getElementById('modal-button').click();
        }
      })
      .catch(error => console.log(error));
  };

  // Save new user in database and route to app
  const addUser = async e => {
    e.preventDefault();
    const response = await fetch("/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(window.location.href = window.location.href + "app")
      .catch(error => console.log(error));
    const body = await response.text();
    console.log(`New User Response: ${body}`)
  };

  // Login Page
  return (
    <div>
      <div className="modal fade" id="newUserModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Invalid Username/Password</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              If you would like to create an account, click "Create User"
      </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-light bg-light">
        <h1 className="navbar-brand">Spill</h1>
        <a href="https://www.github.com/joshuamango/spill" className="btn btn-outline-dark" role="button">
          About
        </a>
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
          <input
            className="form-control"
            id="usernameInput"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="form-control"
            id="passwordInput"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-dark" id="login-button" onClick={e => login(e)}>
          Login
        </button>
        <button className="btn btn-dark" onClick={e => addUser(e)}>Create User</button>
        <button id="modal-button" type="button" className="btn btn-primary" data-toggle="modal" data-target="#newUserModal">
          Launch demo modal
        </button>
      </center>
    </div>
  );
};

export default LoginPage;
