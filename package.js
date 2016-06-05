Package.describe({
  name: "dispatch:mocha",
  summary: "Run server-only package or app tests with Mocha",
  git: "https://github.com/DispatchMe/meteor-mocha.git",
  version: '0.0.7',
  testOnly: true,
});

Package.onUse(function (api) {
  api.versionsFrom('1.3');

  api.use([
    'dispatch:mocha-core@0.0.2',
    'ecmascript',
  ], 'server');

  api.mainModule('server.js', 'server');
});
