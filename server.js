import { mochaInstance } from 'meteor/dispatch:mocha-core';

const reporter = process.env.SERVER_TEST_REPORTER || 'spec';

// Before Meteor calls the `start` function, app tests will be parsed and loaded by Mocha
function start() {
  // We need to set the reporter when the tests actually run to ensure no conflicts with
  // other test driver packages that may be added to the app but are not actually being
  // used on this run.
  mochaInstance.reporter(reporter);

  mochaInstance.run((failureCount) => {
    if (!process.env.TEST_WATCH) {
      if (failureCount > 0) {
        process.exit(1); // exit with non-zero status if there were failures
      } else {
        process.exit(0);
      }
    }
  });
}

export { start };
