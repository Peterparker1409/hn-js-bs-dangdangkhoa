const express = require('express');
const router = express.Router();
const fs = require('fs');

let usersData = JSON.parse(fs.readFileSync('Users.json', 'utf8'));

router.get('/', (req, res) => {
  res.json(usersData);
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const user = usersData.find((user) => user.id === parseInt(userId));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: usersData.length + 1, name, email };
  usersData.push(newUser);
  fs.writeFileSync('Users.json', JSON.stringify(usersData, null, 2));
  res.json(newUser);
});

router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { email } = req.body;
  const userIndex = usersData.findIndex((user) => user.id === parseInt(userId));
  if (userIndex !== -1) {
    usersData[userIndex].email = email;
    fs.writeFileSync('Users.json', JSON.stringify(usersData, null, 2));
    res.json(usersData[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  usersData = usersData.filter((user) => user.id !== parseInt(userId));
  fs.writeFileSync('Users.json', JSON.stringify(usersData, null, 2));
  res.json({ message: 'User deleted successfully' });
});

module.exports = router;
