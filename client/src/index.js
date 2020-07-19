import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './login.js';
import App from './noteapp.js';
import Home from './home.js'
import './index.css';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/spill/" component={LoginPage} />
        <Route path="/spill/app/" component={App} />
      </div>
    </Router>
  );
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

