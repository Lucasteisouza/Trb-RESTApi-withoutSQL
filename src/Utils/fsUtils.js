const fs = require('fs').promises;
const path = require('path');

const TALKER_FILE_PATH = '../talker.json';

const readTalkerData = async () => {
  try {
    const talkerData = await fs.readFile(path.join(__dirname, TALKER_FILE_PATH), 'utf-8');
    return JSON.parse(talkerData);
  } catch (err) {
    console.error(err);
  }
};

const writeNewTalker = async (newTalker) => {
  try {
    const oldTalkers = await readTalkerData();
    const newID = oldTalkers.length + 1;
    const newTalkerWithID = { ...newTalker, id: newID };
    const allTalkers = [...oldTalkers, newTalkerWithID];
    await fs.writeFile(
      path.join(__dirname, TALKER_FILE_PATH),
      JSON.stringify(allTalkers, null, 2),
      );
    return newTalkerWithID;
  } catch (err) {
    console.error(err);
  }
};

const updateTalker = async (id, newTalker) => {
  try {
    const oldTalkers = await readTalkerData();
    const talkerIDexcluded = oldTalkers.filter((talker) => talker.id !== id);
    const newTalkerWithID = { ...newTalker, id: Number(id) };
    const allTalkers = [...talkerIDexcluded, newTalkerWithID];
    await fs.writeFile(
      path.join(__dirname, TALKER_FILE_PATH),
      JSON.stringify(allTalkers, null, 2),
    );
    return newTalkerWithID;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  readTalkerData,
  writeNewTalker,
  updateTalker,
};
