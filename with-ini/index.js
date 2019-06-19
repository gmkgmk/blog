var fs = require('fs'),
  ini = require('ini');

var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
console.log('config: ', config);
config.paths = {};
config.paths.tmpdir = '/tmp';

fs.writeFileSync(
  './config_modified.ini',
  ini.stringify(config)
);
