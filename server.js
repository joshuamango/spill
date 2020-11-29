const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = process.env.PORT || 8084;

app.use(session({
	'secret': 'atdTw6XY0i'
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/names', (req, res) => {
  db.getNames(function (names) {
    res.json({ names: names });
  });
});

app.get('/api/currentUser', (req, res) => {
  res.json({ currentUser: req.session.currentUser })
});

app.post('/api/addUser', (req, res) => {
  db.addName(req.body.username, req.body.password);
  req.session.currentUser = req.body.username;
  res.send(`I received your POST request. This is what you sent me: ${req.body.username} ${req.body.password}`);
});

app.post('/api/login', (req, res) => {
  req.session.currentUser = req.body.username;
  db.login(req.body.username, req.body.password, function (loginResult) {
    res.json({ login: loginResult });
  });
});

app.post('/api/savenote', (req, res) => {
  db.saveNote(req.session.currentUser, req.body.first, req.body.second, req.body.time, req.body.key);
});

app.get('/api/getnotes', (req, res) => {
  db.getNotes(req.session.currentUser, function (array) {
    res.json({ list: array })
  });
});

app.post('/api/delete', (req, res) => {
  db.deleteNote(req.body.key);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
