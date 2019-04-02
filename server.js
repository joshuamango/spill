const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/names', (req, res) => {
  db.getNames(function(names) {
    res.json({names: names});
  });
})

app.post('/api/world', (req, res) => {
  db.addName(req.body.post);
  res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);
});

app.post('/api/login', (req, res) => {
  console.log(`req.body.post: ${req.body.post}`)
  db.login(req.body.post, function(loginResult) {
    res.json({login: loginResult});
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
