Package.describe({
  name: "dispatch:mocha",
  summary: "Run server-only package or app tests with Mocha",
  git: "https://github.com/dispatch/meteor-mocha.git",
  version: '0.0.3',
  testOnly: true,
});

Npm.depends({
  mocha: '2.4.5',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'practicalmeteor:mocha-core@0.1.4',
  ], 'server');

  api.mainModule('server.js', 'server');
});
