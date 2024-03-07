#!/bin/bash

#bash script for compiling the project and running the emulator.

#check if the dist folder exists and create 1 if it doesnt
if [ ! -d "dist" ]; then
  mkdir dist
  echo "Created dist directory"
fi

#TS version?
tsc --version

#compile TS code
echo "Starting TypeScript compile"
tsc --rootDir src/ --outDir dist/

#build bundle javascript file
echo "Building bundle"
browserify "./dist/system.js" -o "./dist/bundle.js"

#run express server
echo "Starting Express server"
node server.js