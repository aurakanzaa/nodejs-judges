const db = require("../sqlite-config");

db.serialize(function() {
  let sql = `CREATE TABLE IF NOT EXISTS favorite_songs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(64),
        artist VARCHAR(64)
    );`;
  db.run(sql, err => {
    if (err) throw err;
    console.log("Table created");
  });
});

db.close();
