const express = require('express');

const router = express.Router();
const tokenValidator = require('../middlewares/tokenValidator');
const { nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator } = require('../middlewares/talkerValidator');
const { readTalkerData,
    writeNewTalker,
    updateTalker,
    deleteTalker } = require('../Utils/fsUtils');

router.get('/talker/search',
  tokenValidator,
  async (req, res) => {
  const { q } = req.query;
  const talkerData = await readTalkerData();
  const filteredTalkers = talkerData.filter((t) => t.name.includes(q));
  return res.status(200).json(filteredTalkers);
});

router.get('/talker', async (req, res) => {
  const talkerData = await readTalkerData();
  return res.status(200).json(talkerData);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerData = await readTalkerData();
  const talker = talkerData.find((t) => t.id === Number(id));
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talker);
});

router.post('/talker',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const newTalkerWithID = await writeNewTalker({ name, age, talk });
  return res.status(201).json(newTalkerWithID);
});

router.put('/talker/:id',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkerData = await readTalkerData();
    const wasFound = talkerData.find((t) => t.id === Number(id));
    if (!wasFound) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    const updatedTalker = await updateTalker(id, { name, age, talk });
    return res.status(200).json(updatedTalker);
  });

router.delete('/talker/:id', tokenValidator, async (req, res) => {
  const { id } = req.params;
  const talkerData = await readTalkerData();
  const wasFound = talkerData.find((t) => t.id === Number(id));
  if (!wasFound) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  await deleteTalker(id);
  return res.status(204).end();
});

module.exports = router;