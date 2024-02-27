@echo off

REM Batch script for compiling the project and running the emulator on windows.
REM !!RUN THE COMMANDS IN YOUR TERMINAL IF IT DOES NOT WORK!!

REM Check if the dist folder exists and create one if it doesn't
if not exist "dist" (
  mkdir dist
  echo Created dist directory
)

REM TypeScript version
tsc --version

REM Compile TypeScript code
echo Starting TypeScript compile
tsc --rootDir src/ --outDir dist/