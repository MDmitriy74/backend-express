const express = require('express');
const router = express.Router();

// let users = [
//   { "id": 1, "name": "Dima" },
//   { "id": 2, "name": "Vlad" }
// ];
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

const insert = "INSERT INTO users (name) VALUES (?)";

router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users",[], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send("Ошибка сервера при получении пользователей");
    } else {
      res.send(rows);
    }
  });
});

router.get('/:id', function(req, res, next) {
  const userId = parseInt(req.params.id);
  const sql = "SELECT id, name FROM users WHERE id = ?";
  db.get(sql, [userId], (err, row) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Ошибка сервера при поиске пользователя" });
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

router.post('/', function(req, res, next) {
  const name = req.body.name;
  if (name === "")
    res.status(400).json({ message: "Invalid user data" });

  const insert = "INSERT INTO users (name) VALUES (?)";

  db.run(insert, [name], function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Ошибка сервера при сохранении пользователя");
    } else {
      res.status(201).json({
        id: this.lastID,
        name: name
      });
    }
  });
});

module.exports = router;