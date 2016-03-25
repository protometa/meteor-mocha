import Mocha from 'mocha';

// Initialize a new `Mocha` test runner instance
const mainMocha = new Mocha();

// Use practicalmeteor:mocha-core to bind the Meteor environment and support
// synchronous server code.
Package['practicalmeteor:mocha-core'].setupGlobals(mainMocha);

// Before Meteor calls the `start` function, app tests will be parsed and loaded by Mocha
function start() {
  mainMocha.run((failureCount) => {
    if (failureCount > 0) {
      process.exit(2); // exit with non-zero status if there were failures
    } else {
      process.exit(0);
    }
  });
}

export { start };
