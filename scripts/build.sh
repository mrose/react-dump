#!/bin/sh
rm -rf lib/
./node_modules/.bin/babel --presets es2015 react-app src/ --out-dir lib/
