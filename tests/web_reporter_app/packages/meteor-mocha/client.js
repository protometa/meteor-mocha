import { mocha } from 'meteor/practicalmeteor:mocha-core';
import { Meteor } from 'meteor/meteor';
import prepForHTMLReporter from './prepForHTMLReporter';
import './ejson';

const { mochaOptions, runnerOptions } = Meteor.settings.public.mochaRuntimeArgs || {};

// If we're not running client tests automatically in a headless browser, then we
// probably are going to want to see an HTML reporter when we load the page.
if (runnerOptions.runClient && !runnerOptions.browserDriver) {
  prepForHTMLReporter(mocha);
} else {
  require('./browser-shim');
}

// Run the client tests. Meteor calls the `runTests` function exported by
// the driver package on the client.
function runTests() {
  if (!runnerOptions.runClient) return;

  const { clientReporter, grep, invert, reporter } = mochaOptions || {};
  if (grep) mocha.grep(grep);
  if (invert) mocha.options.invert = invert;

  if (runnerOptions.browserDriver) {
    // We need to set the reporter when the tests actually run. This ensures that the
    // correct reporter is used in the case where another Mocha test driver package is also
    // added to the app. Since both are testOnly packages, top-level client code in both
    // will run, potentially changing the reporter.
    mocha.reporter(clientReporter || reporter);

    // These `window` properties are all used by the client testing script in the
    // browser-tests package to know what is happening.
    window.testsAreRunning = true;
    mocha.run((failures) => {
      window.testsAreRunning = false;
      window.testFailures = failures;
      window.testsDone = true;
    });
  } else {
    mocha.reporter('html');
    const runner = mocha.run(() => {
      Meteor.call('runTests');
    });
    Meteor.connection.registerStore('meteortesting:mocha_reporter', {
      update({ msg, fields }) {
        if (msg !== 'added') return;
        const { eventName, args } = fields;
        runner.emit(eventName, ...args);
      },
    });
    Meteor.subscribe('meteortesting:mocha_reporter');
  }
}

export { runTests };
