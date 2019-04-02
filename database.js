const sqlite3 = require('sqlite3').verbose();

function addName(name) {
    //Open the database
    const db = new sqlite3.Database('spillsave', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the spillsave database.');
    });

    // Perform actions
    db.serialize(() => {
        const write = db.prepare('INSERT INTO user VALUES (?)');
        write.run(name);
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

function deleteName(name) {
    // Open the database
    const db = new sqlite3.Database('spillsave', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the spillsave database.');
    });

    // Perform actions
    db.run('DELETE FROM name WHERE name=?', name, function(err) {
        if (err) {
            return console.error(err.message);
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

function login(name, callback) {
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
    db.each("SELECT name FROM user", (err, row) => {
      if (row.name == name) {
        doesExist = true; break;
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

module.exports.login = login;
module.exports.addName = addName;
module.exports.getNames = getNames;
