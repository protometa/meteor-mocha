Package.describe({
  name: "dispatch:mocha",
  summary: "Run server-only package or app tests with Mocha",
  git: "https://github.com/dispatch/meteor-mocha.git",
  version: '0.0.1',
  testOnly: true,
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'tmeasday:check-npm-versions@0.1.1',
    'practicalmeteor:mocha-core@0.1.4',
  ], 'server');

  api.mainModule('server.js', 'server');
});
