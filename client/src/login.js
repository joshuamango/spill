import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

   const callApi = async e => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: username })
    }).catch(error => console.log(error));
    const body = await response.json();
    if (body.login) {
      window.location.href = window.location.href + "app"
    }
    else {
      alert('Invalid username')
    }
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <h1 className="navbar-brand">SpillSave</h1>
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
        <div className="form-group" onSubmit={e => callApi(e)}>
          <label htmlFor="usernameInput">Username</label>
          <input
            type="text"
            className="form-control"
            id="usernameInput"
            placeholder="Username"
            value={username}
            onSubmit={e => callApi(e)}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            value={password}
            placeholder="Password"
            onSubmit={e => callApi(e)}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="btn btn-dark"
          onClick={e => callApi(e)}
        >
          Login
        </button>
      </center>
    </div>
  );
};

export default LoginPage;
