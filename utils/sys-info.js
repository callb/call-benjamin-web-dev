const os = require('os'),
      exec = require('child_process').execSync,
      env = process.env;

exports.gen = function () {
  return [{
    name: 'Node.js Version',
    value: process.version.replace('v', '')
  } , {
    name:  'NPM Version',
    value: exec('npm --version').toString().replace(os.EOL, '')
  }, {
    name:  'OS Type',
    value: os.type()
  }, {
    name:  'OS Platform',
    value: os.platform()
  }, {
    name:  'OS Architecture',
    value: os.arch()
  }, {
    name:  'OS Release',
    value: os.release()
  }, {
    name:  'CPU Cores',
    value: os.cpus().length
  }, {
<<<<<<< HEAD
    name:  'Total Memory',
    value: `${Math.round(os.totalmem() / 1048576)} MB`
  }, {
    name:  'Gear Memory',
    value: `${env.OPENSHIFT_GEAR_MEMORY_MB} MB`
=======
    name:  'Gear Memory',
    value: `${env.OPENSHIFT_GEAR_MEMORY_MB}MB`
>>>>>>> fe7b7d2039bef0073ab4a7b83ac5c42dcd370d5f
  }, {
    name:  'NODE_ENV',
    value: env.NODE_ENV
  }];
};

exports.poll = function () {
  return [{
    name: 'Free Memory',
<<<<<<< HEAD
    value: `${Math.round(os.freemem() / 1048576)} MB`
  }, {
    name: 'Uptime',
    value: `${os.uptime()} s`
=======
    value: `${Math.round(os.freemem() / 1048576)}MB`
  }, {
    name: 'Uptime',
    value: `${os.uptime()}s`
>>>>>>> fe7b7d2039bef0073ab4a7b83ac5c42dcd370d5f
  }];
};
