const db = require("../sqlite-config");

db.serialize(() => {
  let sql = "SELECT * FROM judges_list";
  db.all(sql, (err, rows) => {
    if (err) throw err;
    if (rows) {
      // cetak isi rows
      rows.forEach(judge => {
        console.log(`[${judge.no}] ${judge.code} - ${judge.nama} - ${judge.instansi} - ${judge.telp} - ${judge.email} `);
      });
    } else {
      console.log("tidak ada data/hasil");
    }
  });
});

db.close();
