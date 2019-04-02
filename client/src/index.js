import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './login.js';
import App from './App.js';
import './index.css';

const AppRouter = () => {
  let currentPage = <LoginPage />;
  if (window.location.href.includes("app")) {
    currentPage = null;
  }
  return(
    <Router>
      <div>
	{currentPage}
        <Route path="/app/" component={App} />
      </div>
    </Router>
  );
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

