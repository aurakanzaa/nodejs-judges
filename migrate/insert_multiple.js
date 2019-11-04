const db = require("../sqlite-config");

db.serialize(() => {
  let sql = `INSERT INTO judges_list (code,nama,instansi,telp,email) VALUES (?,?,?,?,?)`;
  let stmt = db.prepare(sql);
  let judges = [
    ["CIN", "Annisa Mei", "Test", 9999, "test@gmail.com"],
    ["DEA", "Annisa Mei", "Test", 9999, "test@gmail.com"],
    
  ];

  judges.forEach(juri => {
    stmt.run(juri, err => {
      if (err) throw err;
    });
  });
  console.log(`${judges.length} record inserted`);
  stmt.finalize();
});

db.close();
