const express = require('express');

const router = express.Router();

// const { readTalkerData } = require('../Utils/fsUtils');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const regexEmail = /\S+@\S+\.\S+/;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  if (regexEmail.test(email) === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return res.status(200).json({
    token: Math.random().toString(36).substring(2, 10)
    + Math.random().toString(36).substring(2, 10) });
});

module.exports = router;