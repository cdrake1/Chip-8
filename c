#!/hbin/bas
#! idk if this is supposed to work yet but when I ran it, it only made the dist folder and did nothing else. Maybe im just retarded
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
