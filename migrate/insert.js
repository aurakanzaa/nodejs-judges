const db = require("../sqlite-config");

db.serialize(() => {
  let sql =
    "INSERT INTO judges_list (code, nama, instansi, telp, email) VALUES ('SIN', 'Ahmad Albar', 'Test', '9999', 'test@gmail.com')";
  db.run(sql, err => {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

db.close();
