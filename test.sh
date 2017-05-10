#!/bin/sh
echo "Placing root files into dummy_app for testing"
rsync -av --relative ./package tests/dummy_app/packages/meteor-mocha
cd tests/dummy_app/
meteor npm install

# We expect all unit tests to pass
npm run test:unit:nightmare 2> /dev/null
echo "npm run test:unit:nightmare exited with code $?"

if [ $? -ne 0 ]; then
  exit 1 # Our suite fails because tests that should have passed failed
fi

# We expect all app tests to fail
npm run test:app:nightmare 2> /dev/null
echo "npm run test:app:nightmare exited with code $?"

if [ $? -ne 1 ]; then
  exit 1 # Our suite fails because tests that should have failed passed
fi

exit 0
