@echo off

REM Batch script for compiling the project and running the emulator on windows.
REM !!RUN THE COMMANDS IN YOUR TERMINAL IF IT DOES NOT WORK!!

REM Check if the dist folder exists and create one if it doesn't
if not exist "dist" (
  MKDIR dist
  ECHO Created dist directory
)

REM TypeScript version
CALL tsc --version

REM Compile TypeScript code
ECHO Starting TypeScript compile
CALL tsc --rootDir src/ --outDir dist/

REM webpack to bundle JavaScript files
echo "Starting webpack"
CALL browserify C:\Users\Christian\Documents\GitHub\Chip-8\dist\system.js -o bundle.js REM maybe works