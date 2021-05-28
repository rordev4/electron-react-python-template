const [ , , script, command ] = process.argv;
const { Builder } = require('./build');
const { Cleaner } = require('./clean');
const { Packager } = require('./package');
const { Starter } = require('./start');

const path = require('path');


/**
 * @namespace Dispatcher
 * @description - Dispatches script commands to various scripts.
 * @argument script - Script manager to use (e.g., build or package).
 * @argument command - Command argument describing exact script to run.
 */

switch(script) {
  case 'build':
    return buildApp();

  case 'clean':
    return cleanProject();

  case 'package':
    return packageApp();

  case 'start':
    return startDeveloperMode();
}

/**
 * @description - Builds various production builds (e.g., Python, React).
 * @memberof Dispatcher
 */
function buildApp() {
  const builder = new Builder();

  switch(command) {
    case 'react':
      return builder.buildReact();

    case 'python':
      return builder.buildPython();

    case 'all':
      return builder.buildAll();
  }
};

/**
 * @description - Cleans project by removing various files and folders.
 * @memberof Dispatcher
 */
function cleanProject() {
  const cleaner = new Cleaner();

  // Paths to remove
  [
    path.join(__dirname, '..', '__pycache__'),
    path.join(__dirname, '..', 'docs'),
    path.join(__dirname, '..', 'node_modules'),
    path.join(__dirname, '..', 'package-lock.json'),
    path.join(__dirname, '..', 'yarn.lock')
  ]
    // Iterate and remove process
    .forEach(cleaner.removePath);
    console.log('Project is clean.');
};

/**
 * @description - Builds various installers (e.g., DMG, MSI).
 * @memberof Dispatcher
 */
function packageApp() {
  const packager = new Packager();

  switch(command) {
    case 'windows':
      return packager.packageWindows();

    case 'mac':
      return packager.packageMacOS();
  }
};

/**
 * @description - Starts developer mode of app.
 * Including; React, Electron, and Python/Flask.
 * @memberof Dispatcher
 */
function startDeveloperMode() {
  const start = new Starter();
  start.developerMode();
};