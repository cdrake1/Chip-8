# Chip-8
This project is a **Chip-8 interpreter and virtual machine** written in **Typescript** and running on **Node.js**. You may be asking **"What is Chip-8?"** Well... defined by Wikipedia, Chip-8 "is an interpreted programming language, developed by Joseph Weisbecker made on his 1802 Microprocessor." So to clarify Chip-8 is not an emulator, but an **interpreted programming language**. Nevertheless, We can use our interpreter to run basic **Chip-8 programs and video games!**

## Purpose
There are a lot of reasons that I wanted to work on a project like this. Not only can I gain hands on experience with a larger project environment, but I can explore new programming languages, and understand hardware principles. Most importantly I get to collaborate with friends!

## Credits
This software draws inspiration and is an adaptation of works created by **Prof. Brian Gormanly and Prof. Alan Labouseur** at Marist College. Although their projects are designed for a 6502 architecture, they provided me with insight on how this project can be organized and developed. Furthermore, I also want to note my use of different resources including articles, GitHub repos, and Reddit posts, which have helped strengthen my understanding of Chip-8 and the different ways it can be implemented.

- Alan Labouseur OS: [AlanClasses on GitHub](https://github.com/AlanClasses/TSOS-2019)
- Brian Gormanly Computer Organization and Architecture: [422-tsiraM](https://github.com/MaristGormanly/422-tsiraM)
- Tania Rascia Walkthrough: [taniaRascia.com](https://www.taniarascia.com/writing-an-emulator-in-javascript-chip8/#memory)
- Cowgod's Chip-8 reference: [Cowgod](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM#2.2)
- Austin Morlans building a Chip-8 emulator: [Austin Morlan](https://austinmorlan.com/posts/chip8_emulator/)

## Getting Started and Necessary Setup
To create an environment for this project we are going to need a few things:
1. **Node.js / npm**
2. **TypeScript**
3. **a terminal or commandline**

### Installing Node and TS...

#### Mac
1. Use **Homebrew** to install Node.js by running the command: **"brew install node"** in your terminal. If you dont have Homebrew and you are on MacOs... you need it immedietly...
2. Install TypeScript by running: **"npm install -g typescript"**
3. Finally install Node.js dependencies with: **"npm install"**

#### Windows

- TODO

## Starting The System!
1. Compile TypeScript into JavaScript by running the basch script file **'c'**. If you run into an error trying to run this you most likely need to give the file executive permissions... **"chmod +x c"**
2. run the command **"npm start"** in terminal

## Other Resources
[taniarascia](https://github.com/taniarascia/chip8/blob/master/classes/RomBuffer.js)
[freecodecampe](https://www.freecodecamp.org/news/creating-your-very-own-chip-8-emulator/#:~:text=One%20of%20the%20simplest%20ways,%2C%20more%20in%2Ddepth%20emulators.)
[devernay](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM#2.2)