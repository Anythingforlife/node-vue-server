const fs = require('fs');

module.exports = fileHandling = {
  readAsync,
  writeAsync
}

function readAsync(path) {
  try {
    let rawdata = fs.readFileSync(path);
    return { success: true, data: JSON.parse(rawdata) }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

function writeAsync(path, data) {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
    return { success: true }
  } catch (err) {
    return { success: false, message: err.message }
  }
}