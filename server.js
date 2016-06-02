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
        process.exitCode = 2; // exit with non-zero status if there were failures
      } else {
        process.exitCode = 0;
      }
      // Allow meteor process to handle the SIGINT status and shutdown
      // gracefully instead of using process.exit();
      process.kill(process.pid, 'SIGINT');
    }
  });
}

export { start };
