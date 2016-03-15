# dispatch:mocha

A Mocha test driver package for Meteor 1.3. This package reports server test results in the server console and can be used for running tests on a CI server.

THIS PACKAGE DOES NOT RUN CLIENT TESTS. IF YOUR APP HAS TESTS IN CLIENT CODE, USE https://github.com/DispatchMe/meteor-mocha-phantomjs INSTEAD.

## Installation

In a Meteor 1.3+ app directory:

```bash
npm i --save-dev mocha
meteor add dispatch:mocha
```

Note that you need to install the `mocha` npm package yourself. This Meteor package does not include it automatically, so you can use pretty much any version of Mocha you want (v2+) as long as its API is compatible with how this package works.

## Run app tests

```bash
meteor test --once --driver-package dispatch:mocha
```

### Run with a different reporter

The default Mocha reporter for server tests is the "spec" reporter. You can set the `SERVER_TEST_REPORTER` environment variable to change it.

```bash
SERVER_TEST_REPORTER="dot" meteor test --once --driver-package dispatch:mocha
```
