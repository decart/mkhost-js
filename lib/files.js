const fs = require('fs');
const path = require('path');

module.exports = {
  getScriptExecutionDirectory: () => {
    return path.basename(process.cwd());
  },

  directoryExist: (filePath) => {
    return fs.existsSync(filePath)
  },

  dirList: (baseDir) => {
    return fs.readdirSync(baseDir, { withFileTypes: true })
      .filter(item => item.isDirectory())
      .map(item => item.name);
  },

  guessRoot: (baseDir, siteDir) => {
    const fullPath = path.join(baseDir, siteDir);
    const publicPath = path.join(fullPath, 'public');

    return fs.existsSync(publicPath) ? publicPath : fullPath;
  },

  read(filename) {
    return fs.readFileSync(filename) + '';
  },

  write(data, ...pathPices) {
    const filename = path.join(...pathPices);
    fs.writeFileSync(filename, data);
  },

  append(data, ...pathPices) {
    const filename = path.join(...pathPices);
    fs.appendFileSync(filename, data)
  }
};
