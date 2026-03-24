const express = require('express');
const router = express.Router();

let users = [
  { "id": 1, "name": "Dima" },
  { "id": 2, "name": "Vlad" }
];

router.get('/', function(req, res, next) {
  res.json({ items: users });
});

router.get('/:id', function(req, res, next) {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.post('/', function(req, res, next) {
  const newUser = req.body;
  if (newUser && newUser.id) {
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

module.exports = router;