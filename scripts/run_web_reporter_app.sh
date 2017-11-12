#!/bin/sh
echo "Placing root files into app for testing"
rsync -av ./package/ tests/web_reporter_app/packages/meteor-mocha
cd tests/web_reporter_app/
meteor npm install
npm test
