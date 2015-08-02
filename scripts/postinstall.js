var fs = require('fs'),
    path = require('path');

const PROJECT_NAME = 'brews';
const VENDORS = './src/scss/vendors';
const CONFIG = './config/gulp-dev-config.json';
const API_SETTINGS = './config/ApiSettings.js';

function copyFile(srcFile, destFile, completedMsg) {
  if(fs.existsSync(destFile)) {
    return;
  }

  fs.createReadStream(path.resolve(srcFile))
    .pipe(fs.createWriteStream(destFile))
    .on('error', function(err) {
      console.error(err.message);
      throw err;
    });
  completedMsg && console.log(completedMsg);
}

copyFile(CONFIG + '.example', CONFIG, 'Your configuration file has been copied with the defaults as \'' + CONFIG + '\'');
copyFile(API_SETTINGS + '.example', API_SETTINGS, 'Your ApiSettings has been copied with the defaults as \'' + API_SETTINGS + '\'');

/*
 * A list of symlinks to create. Currently the vendors are all from npm, but
 * they could come from bower or whatevs.
 * @param source - the item to create a symlink of
 * @param target - the the destination of the symlink
 * @param type - the type of the symlink (Used for windows only)
 * @param name - the name of the symlink
 */
var LINKS = [
  {
    source: './node_modules/bootstrap-sass/assets/stylesheets',
    target: VENDORS + '/bootstrap',
    type: 'dir',
    name: 'bootstrap',
  },
  {
    source: './node_modules/normalize-scss-vanilla',
    target: VENDORS + '/normalize-scss-vanilla',
    type: 'dir',
    name: 'normalize-scss-vanilla',
  },
  {
    source: './node_modules/font-awesome/scss',
    target: VENDORS + '/font-awesome',
    type: 'dir',
    name: 'font-awesome',
  },
];

function createSymlink(unresolvedSource, unresolvedTarget, type) {
  var source = path.resolve(unresolvedSource);
  var target = path.resolve(unresolvedTarget);

  if(fs.existsSync(target) && fs.lstatSync(target).isSymbolicLink()) {
    fs.unlinkSync(target);
  }

  try {
    fs.symlinkSync(source, target, type);
  } catch(e) {
    if(e.code == 'EPERM') {
      console.error('SYMLINK ERR! You must run this as administrator in Windows to create symlinks.');
      console.error('SYMLINK ERR! Run \'npm install\' again once you open an admin terminal');
      this.process.exit(1);
    } else {
      throw e;
    }
  }
}

console.log('Creating symlinks for:\n%s\n', LINKS.map(function(link) { return link.name; }).join(', '));
LINKS.forEach(function(link) {
  createSymlink(link.source, link.target, link.type);
});
console.log('Symlinks have been create successfully.');

console.log("Creating symlink for this project as '" + PROJECT_NAME + "'");
createSymlink('./src/js', './node_modules/' + PROJECT_NAME, 'dir');
console.log('Symlink has been created');
