const express = require('express');
const router = express.Router();
const { readTalkerData } = require('../Utils/fsUtils');

router.get ('/talker', async (req, res) => {
  const talkerData = await readTalkerData();
  return res.status(200).json(talkerData);
});

router.get ('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerData = await readTalkerData();
  const talker = talkerData.find((t) => t.id === Number(id));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});

module.exports = router;