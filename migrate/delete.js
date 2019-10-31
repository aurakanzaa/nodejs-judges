const db = require("../sqlite-config");

db.serialize(() => {
  let sql = `DELETE FROM favorite_songs WHERE id=?`;
  let songId = "1";

  db.run(sql, [songId], err => {
    if (!err) console.log("Data deleted");
  });
});

db.close();
