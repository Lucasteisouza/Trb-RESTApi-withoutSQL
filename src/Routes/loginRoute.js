const express = require('express');

const router = express.Router();

// const { readTalkerData } = require('../Utils/fsUtils');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }
  return res.status(200).json({
    token: Math.random().toString(36).substring(2, 10)
    + Math.random().toString(36).substring(2, 10) });
});

module.exports = router;