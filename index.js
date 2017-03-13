#!/usr/bin/env node

const exec = require('child_process').execSync;
const fs = require('fs');
const commandExists = require('command-exists');
const argv = require('minimist')(process.argv.slice(2));

// console.log(argv);

var command = argv._[0];
// const rest = argv._.slice(1);

// console.log('rest', rest);

var options = Object.keys(argv).map(key => {
  // console.log(key);
  if (key !== '_') {
    return '-' + key + ' ' + argv[key];
  }
});


const target = process.argv.slice(3).join(' ');

options.splice(0, 1);
if (options.length) {
  command += ' ' + options.join(' ');
}


// console.log('command', command+ ' '+rest.join(' '));
// console.log('target', target);

const shell = command => new Promise((resolve, reject) => {
  var out = '';
  exec(command, { stdio: 'inherit' }, (error, stdout, stderr) => {
    if (error) {
      resolve(stdout);
      return;
    }

    if (stderr) {
      // out = stderr;
    }
    out += stdout;

    resolve(out);
  });
})

commandExists('yarn', function(err, exists) {
  let cmd = 'npm run';
  if (exists && fs.existsSync('./yarn.lock')) {
    cmd = 'yarn run';
  }
  cmd += ' ' + command;
  shell(cmd)
    .then((out)=> {
      console.log(out); process.end(1);
    })
    .catch(e => {
      console.log(e); process.end(1);
    })
});
