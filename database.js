const sqlite3 = require('sqlite3').verbose();

function addName(user, pass) {
  //Open the database
  const db = new sqlite3.Database('spillsave', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the spillsave database.');
  });

  // Perform actions
  db.serialize(() => {
    const write = db.prepare('INSERT INTO USER(Username, Password) VALUES (?, ?)');
    write.run(user, pass);
    write.finalize();
  })

  //Close the database
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  })
}

function deleteNote(noteKey) {
  console.log("KEY FROM DATABASE: " + noteKey);
  // Open the database
  const db = new sqlite3.Database('spillsave', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the spillsave database.');
  });

  // Perform actions
  db.run('DELETE FROM NOTES WHERE key=?', noteKey, function (err) {
    if (err) {
      console.error(err.message);
    }
    console.log(`Row(s) deleted ${this.changes}`);
  })

  // Close the database
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
  })
}

function getNames(callback) {
  const names = [];

  // Open the database
  const db = new sqlite3.Database('spillsave', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the spillsave database.');
  });

  // Perform actions
  db.serialize(() => {
    db.each("SELECT name FROM user", (err, row) => {
      names.push(row.name);
    });
  });

  // Close the database
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
    callback(names);
  })
}

function login(user, pass, callback) {
  let doesExist = false;

  // Open the database
  const db = new sqlite3.Database('spillsave', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the spillsave database.');
  });

  // Perform actions
  db.serialize(() => {
    db.each("SELECT Username, Password FROM USER", (err, row) => {
      if (row.Username == user && row.Password == pass) {
        doesExist = true;
      }
    })
  })

  // Close the database
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
    console.log(`doesExist: ${doesExist}`)
    callback(doesExist);
  })
}

function saveNote(username, title, body, time, key) {
  // Open the database
  const db = new sqlite3.Database('spillsave', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the spillsave database.');
  });

  // Insert name and message into the "notes" table
  db.serialize(() => {
    const writeName = db.prepare('INSERT INTO NOTES(Username, Title, Body, Time, Key) VALUES(?, ?, ?, ?, ?)');
    writeName.run(username, title, body, time, key);
    writeName.finalize();
  })

  // Close the database
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  })
}

function getNotes(name, callback) {
  let messages = [];

  // Open the database
  const db = new sqlite3.Database('spillsave', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the spillsave database.');
  });

  // Retrieve all notes written by the current user
  db.serialize(() => {
    db.each("SELECT Username, Title, Body, Time, Key FROM NOTES", (err, row) => {
      if (row.Username == name) {
        messages.push({
          username: row.Username,
          title: row.Title,
          body: row.Body,
          time: row.Time,
          key: row.Key
        });
        console.log(row);
      }
    })
  })

  // Close the database
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
    callback(messages);
  })
}

module.exports.login = login;
module.exports.addName = addName;
module.exports.getNames = getNames;
module.exports.saveNote = saveNote;
module.exports.getNotes = getNotes;
module.exports.deleteNote = deleteNote;
