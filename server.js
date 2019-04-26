const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = process.env.PORT || 5000;

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
  currentUser = req.body.username;
  db.login(req.body.username, req.body.password, function (loginResult) {
    res.json({ login: loginResult });
  });
});

app.post('/api/savenote', (req, res) => {
  console.log("Title: " + req.body.first)
  console.log("Body: " + req.body.second)
  console.log("Time: " + req.body.time)
  console.log("Key: " + req.body.key)
  db.saveNote(currentUser, req.body.first, req.body.second, req.body.time, req.body.key);
});

app.get('/api/getnotes', (req, res) => {
  console.log(`Current User: ${currentUser}`)
  db.getNotes(currentUser, function (array) {
    res.json({ list: array })
    console.log(array);
  });
});

app.post('/api/delete', (req, res) => {
  console.log("Key: " + req.body.key);
  db.deleteNote(req.body.key);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
