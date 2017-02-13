#!/bin/sh
rm -rf lib/components/dataTypes*.js
rm -rf lib/components/*.js
rm -rf lib/*.js

./node_modules/.bin/babel --presets es2015,react-app src/ --out-dir lib/
