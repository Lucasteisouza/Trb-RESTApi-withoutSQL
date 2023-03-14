const fs = require('fs').promises;
const path = require('path');

const readTalkerData = async () => {
  try {
    const talkerData = await fs.readFile(path.join(__dirname, '..', 'talker.json'), 'utf-8');
    return JSON.parse(talkerData);
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  readTalkerData,
}
