const db = require("../sqlite-config");

db.serialize(() => {
  let sql = `DELETE FROM judges_list WHERE no=?`;
  let judgeId = "1";

  db.run(sql, [judgeId], err => {
    if (!err) console.log("Data deleted");
  });
});

db.close();
