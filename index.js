#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const Configstore = require('configstore');

const packageJson = require('./package.json');
const defaultsJson = require('./config.json');
const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const sug = require('./lib/suggestions');
const temp = require('./lib/template');

const conf = new Configstore(packageJson.name, defaultsJson);
const baseDir = conf.get('baseDir');
const dirs = files.dirList(baseDir);

/**
 * Entry point
 */
const main = async () => {
  console.log('🌐️ Sites base dir:', chalk.yellow(baseDir), '\n');

  const domainName = await inquirer.askDomainName();
  const sitesDirs = sug.fusesort(dirs, domainName);
  const rootDir = await inquirer.askRootDirectory(sitesDirs, baseDir);

  const vhost = temp.getView('http', {
    host: domainName,
    root_dir: rootDir,
    index: conf.get('index'),
    fastcgi_pass: conf.get('fastcgiPass')
  });

  files.write(vhost, conf.get('nginxVHosts'), domainName + '.conf');
  files.append('\n127.0.0.1 ' + domainName, '/etc/hosts');
};

clear();
main();
