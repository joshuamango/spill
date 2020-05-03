const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
<<<<<<< HEAD
const port = process.env.PORT || 5000;
=======
const port = process.env.PORT || 8084;
>>>>>>> 76ab1006ca68d635c924a738df961ef9caed687e

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let currentUser = '';

app.get('/api/names', (req, res) => {
  db.getNames(function (names) {
    res.json({ names: names });
  });
});

app.get('/api/currentUser', (req, res) => {
  res.json({ currentUser: currentUser })
});

app.post('/api/addUser', (req, res) => {
  db.addName(req.body.username, req.body.password);
  currentUser = req.body.username;
  res.send(`I received your POST request. This is what you sent me: ${req.body.username} ${req.body.password}`);
});

app.post('/api/login', (req, res) => {
<<<<<<< HEAD
=======
  console.log('We in boys');
>>>>>>> 76ab1006ca68d635c924a738df961ef9caed687e
  currentUser = req.body.username;
  db.login(req.body.username, req.body.password, function (loginResult) {
    res.json({ login: loginResult });
  });
});

app.post('/api/savenote', (req, res) => {
  db.saveNote(currentUser, req.body.first, req.body.second, req.body.time, req.body.key);
});

app.get('/api/getnotes', (req, res) => {
  db.getNotes(currentUser, function (array) {
    res.json({ list: array })
  });
});

app.post('/api/delete', (req, res) => {
  db.deleteNote(req.body.key);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
