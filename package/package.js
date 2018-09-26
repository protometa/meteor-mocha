Package.describe({
  name: 'protometa:mocha',
  summary: 'Run Meteor package or app tests with Mocha',
  git: 'https://github.com/protometa/meteor-mocha.git',
  documentation: '../README.md',
  version: '0.5.3',
  testOnly: true,
});

Package.onUse(function onUse(api) {
  api.use([
    'practicalmeteor:mocha-core@1.0.0',
    'ecmascript@0.3.0',
  ]);

  api.use([
    'protometa:browser-tests@0.1.3'
  ], 'server');

  api.mainModule('client.js', 'client');
  api.mainModule('server.js', 'server');
});
