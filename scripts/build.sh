#!/bin/sh
rm -rf lib/*.js
./node_modules/.bin/babel --presets es2015 src/ --out-dir lib/
