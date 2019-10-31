const db = require("../sqlite-config");

db.serialize(() => {
  let sql = `INSERT INTO favorite_songs (title, artist) VALUES (?,?)`;
  let stmt = db.prepare(sql);
  let songs = [
    ["Kertoyono Medot Janji", "Denni Caknan"],
    ["Cidro", "Didi Kempot"],
    ["Ditinggal Rabi", "Nella Kharisma"],
    ["Korban Janji", "Guyon Waton"]
  ];

  songs.forEach(song => {
    stmt.run(song, err => {
      if (err) throw err;
    });
  });
  console.log(`${songs.length} record inserted`);
  stmt.finalize();
});

db.close();
