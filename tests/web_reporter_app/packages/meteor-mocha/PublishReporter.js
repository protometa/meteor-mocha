import { Meteor } from 'meteor/meteor';
import { Mocha } from 'meteor/practicalmeteor:mocha-core';
import EventEmitter from 'events';
import ensureEJSON from './ejson';

function getHandler(publish) {
  let firstRun = true;
  return (data) => {
    // This also sends a message to the client but it's ignored
    if (!firstRun) publish.removed('meteortesting:mocha_reporter', 'emit');

    // Send event new data
    publish.added('meteortesting:mocha_reporter', 'emit', data);

    // Not the first run
    firstRun = false;
  };
}

// Local collection, just for publishing to the client
const emitter = new EventEmitter();
Meteor.publish('meteortesting:mocha_reporter', function repPublish() {
  const handler = getHandler(this);
  emitter.addListener('ddpEvent', handler);
  this.ready();
  this.onStop(() => {
    emitter.removeListener('ddpEvent', handler);
  });
});

class PublishReporter extends Mocha.reporters.Base {
  constructor(runner) {
    super(runner);

    [
      'start',
      'end',
      'suite',
      'suite end',
      'test end',
      'pass',
      'fail',
      'pending',
    ].forEach((eventName) => {
      runner.on(eventName, (...args) => {
        args.forEach(ensureEJSON);

        // Adjust the error object to make it DDP safe for "fail" events
        if (eventName === 'fail') {
          const e = args[1];
          args[1] = {
            name: e.name,
            message: e.message,
            stack: e.stack,
          };
        }

        emitter.emit('ddpEvent', {
          eventName,
          args,
        });
      });
    });
  }
}

export default PublishReporter;
