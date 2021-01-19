const inquirer = require('inquirer');
const files = require('./files');

const required = (value) => !!value;
const validate = (validator, error) => (value) => validator(value) ? true : error;

module.exports = {
  askDomainName: async () => {
    const questions = [
      {
        type: 'input',
        name: 'domain',
        message: 'Domain name:',
        validate: validate(required, 'Domain name is required'),
      }
    ];

    const answers = await inquirer.prompt(questions);
    return answers.domain;
  },

  askRootDirectory: async (options, baseDir) => {
    const questions = [
      {
        type: 'list',
        name: 'siteDir',
        message: 'Site base dir:',
        choices: options,
        loop: false
      },
      {
        type: 'input',
        name: 'rootDir',
        message: 'Site root dir:',
        default: answers => files.guessRoot(baseDir, answers.siteDir)
      },
    ];

    const answers = await inquirer.prompt(questions);
    return answers.rootDir;
  }
};
