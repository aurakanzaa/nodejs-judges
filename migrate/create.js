const db = require("../sqlite-config");

db.serialize(function() {
  let sql = `CREATE TABLE IF NOT EXISTS judges_list(
        no INTEGER PRIMARY KEY AUTOINCREMENT,
        code VARCHAR(64),
        nama VARCHAR(64),
        instansi VARCHAR(64),
        telp INTEGER(64),
        email VARCHAR(64)
    )`;
  db.run(sql, err => {
    if (err) throw err;
    console.log("Table created");
  });
});

db.close();
