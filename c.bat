@echo off

REM bash script for compiling the project and running the emulator.

REM check if the dist folder exists and create 1 if it doesnt
if not exist "dist" (
  MKDIR dist
  ECHO Created dist directory
)

REM TS version?
CALL tsc --version

REM compile TS code
ECHO Starting TypeScript compile
CALL tsc --rootDir src/ --outDir dist/

REM build bundle javascript file
echo Building bundle
CALL browserify ".\dist\system.js" -o ".\dist\bundle.js"

REM run express server
echo Starting Express server
CALL node server.js
