import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      post: "",
      responseToPost: "",
      names: [],
      logNames: async () => {
        const response = await fetch("/api/names");
        const body = await response.json();
        this.setState({ names: body.names });
      }
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.post })
    }).catch(error => console.log(error));
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="App">
      <center>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            placeholder="Name"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
        <button className="btn btn-outline-dark" style={{marginRight: "10px"}}onClick={this.state.logNames}>logNames</button>
        <button className="btn btn-outline-dark" onClick={e => this.setState({ names: [] })}>clearNames</button>
        <h4 style={{ marginTop: "50px", marginBottom: "30px" }}>
          Currently In Server
        </h4>
        <center>
          <ul
            className="list-group list-group-flush"
            style={{ width: "250px" }}
          >
            {this.state.names.map(name => (
              <li className="list-group-item" key={name}>
                {name}
              </li>
            ))}
          </ul>
        </center>
      </center>
      </div>
    );
  }
}

export default App;
