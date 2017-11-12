import { EJSON } from 'meteor/ejson';
import { Meteor } from 'meteor/meteor';

const suitesByFullTitle = {};
const testsByFullTitle = {};

let Suite;
let Test;
let Runnable;
if (Meteor.isClient) {
  Suite = global.Mocha.Suite;
  Test = global.Mocha.Test;
  Runnable = global.Mocha.Runnable;
}

EJSON.addType('Mocha.Suite', (json) => {
  let suite = suitesByFullTitle[json.fullTitle];
  if (suite) return suite;

  suite = new Suite(json.title);
  suite.root = json.root;
  suite.pending = json.pending;
  suite.parent = suitesByFullTitle[json.parentFullTitle];
  if (suite.parent) suite.parent.addSuite(suite);
  suitesByFullTitle[json.fullTitle] = suite;
  return suite;
});

EJSON.addType('Mocha.Runnable', (json) => {
  let test = testsByFullTitle[json.fullTitle];
  if (test) return test;

  test = new Runnable(json.title);
  Object.keys(json).forEach((prop) => {
    if (prop !== 'parentFullTitle' && prop !== 'fullTitle') {
      test[prop] = json[prop];
    }
  });
  test.parent = suitesByFullTitle[json.parentFullTitle];
  if (test.parent) test.parent.addTest(test);
  testsByFullTitle[json.fullTitle] = test;
  return test;
});

EJSON.addType('Mocha.Test', (json) => {
  let test = testsByFullTitle[json.fullTitle];
  if (test) return test;

  test = new Test(json.title);
  Object.keys(json).forEach((prop) => {
    if (prop !== 'parentFullTitle' && prop !== 'fullTitle') {
      test[prop] = json[prop];
    }
  });
  test.parent = suitesByFullTitle[json.parentFullTitle];
  if (test.parent) test.parent.addTest(test);
  testsByFullTitle[json.fullTitle] = test;
  return test;
});

export default function ensureEJSON(obj) {
  if (!obj || !obj.constructor || obj.constructor.prototype.typeName) return;
  const klass = obj.constructor.name;
  if (klass === 'Suite') {
    Object.assign(obj.constructor.prototype, {
      typeName() {
        return 'Mocha.Suite';
      },
      toJSONValue() {
        return {
          root: this.root,
          title: this.title,
          pending: this.pending,
          fullTitle: this.fullTitle(),
          parentFullTitle: this.parent && this.parent.fullTitle(),
        };
      },
    });
  } else if (klass === 'Test' || klass === 'Runnable') {
    Object.assign(obj.constructor.prototype, {
      typeName() {
        return `Mocha.${klass}`;
      },
      toJSONValue() {
        return {
          title: this.title,
          async: this.async,
          sync: this.sync,
          timedOut: this.timedOut,
          pending: this.pending,
          type: this.type,
          timer: this.timer,
          duration: this.duration,
          state: this.state,
          speed: this.speed,
          fullTitle: this.fullTitle(),
          parentFullTitle: this.parent && this.parent.fullTitle(),
          _timeout: this._timeout,
          _slow: this._slow,
          body: this.body,
          fn: this.fn && this.fn.toString(),
          err: this.err && { name: this.err.name, message: this.err.message },
        };
      },
    });
  }
}
