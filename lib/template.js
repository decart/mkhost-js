const files = require('./files');

module.exports = {
  getView: (viewName, variables) => {
    let template = files.read(__dirname + '/../templates/' + viewName);

    for(let varName in variables) {
      const varStr = '#\{' + varName.toUpperCase() + '\}';
      const varRegex = new RegExp(varStr, 'g');
      template = template.replace(varRegex, variables[varName]);
    }

    return template;
  }
}
