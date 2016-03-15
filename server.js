// We let the package user install whatever mocha version they want
// on the server. This will throw an error if they haven't done so.
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
checkNpmVersions({
  'mocha': '2.x.x'
});

// We can't use `import` here because it will be hoisted to before the `checkNpmVersions` call
const Mocha = require('mocha');

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
