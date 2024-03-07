(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/*
    Cpu file
    Creates the Chip-8 cpu
    This is where the magic happens
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.cpu = void 0;
//import hardware and memory
const hardware_1 = require("./hardware");
//cpu class -- child class of hardware
class cpu extends hardware_1.hardware {
    //cpu constructor -- creates the cpu and initializes its variables
    constructor(id, name, _monitor, _keyboard, _speaker) {
        super(id, name); //passes cpu to hardware
        this.registers = new Uint8Array(16);
        this.stack = new Uint8Array(16);
        this.programCounter = 0x200;
        this.stackPointer = 0x00;
        this.indexRegister = 0x0000;
        this.delayTimer = 0;
        this.soundTimer = 0;
        this.cpuSpeed = 10;
        this.paused = false;
        this._monitor = _monitor;
        this._keyboard = _keyboard;
    }
    //Simple function to decrement timers if theyre active
    updateTimers() {
        if (this.delayTimer > 0)
            this.delayTimer--;
        if (this.soundTimer)
            this.soundTimer--;
    }
    //Call and coordinate fetch, decode and execute
    //SWITCH CASING WILL BE EXTREMELY REPETITIVE, BUT I WANT TO SHOW ALL 3 STEPS SEPERATELY
    step() {
        //Fetch the opcode
        const opcode = this.fetch();
        //switch match opcode to instruction
        const instruction = this.decode(opcode);
        //run the instruction
        this.execute(instruction, opcode);
        //every step we update canvas, timers and play a sound
        if (this.paused != true)
            this.updateTimers();
        //playsoundhere ->
        this._monitor.paintCanvas();
    } //step
    //Get address from memory
    fetch() {
        for (let i = 0; i < this.cpuSpeed; i++) {
            if (this.paused != true) {
                let opcode = (this._memory[this.programCounter] << 8 | this._memory[this.programCounter + 1]); //build opcode using or (opcode consists of two byte)
                return (opcode);
            } //if
        } //for
    } //fetch
    //decode opcode
    decode(inputOpcode) { return this.disassemble(inputOpcode); } //decode
    //find instruction from opcode
    disassemble(inputOpcode) {
        let inputInstruction = "null";
        switch (inputOpcode & 0xF000) //Were going to check for a match at the first digit
         {
            case 0x0000:
                switch (inputOpcode) //test for which of 0x0000 it is
                 {
                    case 0x00E0:
                        inputInstruction = "CLR";
                        break;
                    case 0x00EE:
                        inputInstruction = "RET";
                        break;
                } //switch
                break;
            case 0x1000:
                inputInstruction = "JPaddr";
                break;
            case 0x2000:
                inputInstruction = "CALLaddr";
                break;
            case 0x3000:
                inputInstruction = "SEVxbyte";
                break;
            case 0x4000:
                inputInstruction = "SNEVxbyte";
            case 0x5000:
                inputInstruction = "SEVxVy";
                break;
            case 0x6000:
                inputInstruction = "LDVxbyte";
            case 0x7000:
                inputInstruction = "ADDVxbyte";
            case 0x8000:
                switch (inputOpcode & 0xF00F) //test for which of 0x8000 it is
                 {
                    case 0x8000:
                        inputInstruction = "LDVxVy";
                        break;
                    case 0x8001:
                        inputInstruction = "ORVxVy";
                        break;
                    case 0x8002:
                        inputInstruction = "VxVy";
                        break;
                    case 0x8003:
                        inputInstruction = "XORVxVy";
                        break;
                    case 0x8004:
                        inputInstruction = "ADDVxVy";
                        break;
                    case 0x8005:
                        inputInstruction = "SUBVxVy";
                        break;
                    case 0x8006:
                        inputInstruction = "SHRVxVy";
                        break;
                    case 0x8007:
                        inputInstruction = "SUBNVxVy";
                        break;
                    case 0x800E:
                        inputInstruction = "SHLVxVy";
                        break;
                    default:
                        throw new Error('BAD OPCODE');
                } //switch
                break;
            case 0x9000:
                inputInstruction = "SNMEVxVy";
                break;
            case 0xA000:
                inputInstruction = "LDIaddr";
                break;
            case 0xB000:
                inputInstruction = "JPV0addr";
                break;
            case 0xC000:
                inputInstruction = "RNDVxbyte";
                break;
            case 0xD000:
                inputInstruction = "DRWVxVynibble";
            case 0xF000:
                switch (inputOpcode & 0xFF) // check last two digits
                 {
                    case 0x9E:
                        inputInstruction = "SKPVx";
                        break;
                    case 0xA1:
                        inputInstruction = "SKNPVx";
                        break;
                    case 0x07:
                        inputInstruction = "LDVxDT";
                        break;
                    case 0x0A:
                        inputInstruction = "LDVxK";
                        break;
                    case 0x15:
                        inputInstruction = "LDDTVx";
                        break;
                    case 0x18:
                        inputInstruction = "LDSTVx";
                        break;
                    case 0x1E:
                        inputInstruction = "ADDIVx";
                        break;
                    case 0x29:
                        inputInstruction = "LDFVx";
                        break;
                    case 0x33:
                        inputInstruction = "LDBVx";
                        break;
                    case 0x55:
                        inputInstruction = "LDIVx";
                    case 0x65:
                        inputInstruction = "LDVxI";
                        break;
                    default:
                        throw new Error('BAD OPCODE!!');
                } //switch
        } //switch
        return (inputInstruction);
    } //disassemble
    //Execute the Instruction with 36 Switch Cases
    execute(inputInstruction, inputOpcode) {
        this.programCounter += 2;
        const x = (inputOpcode & 0x0F00) >> 8; //determine x because it is a common reference among instructions
        const y = (inputOpcode & 0x00F0) >> 4; //determine y because it is a common reference among instructions
        switch (inputInstruction) {
            case "CLR":
                //clears display
                this._monitor.clear();
                break;
            case "RET":
                //The interpreter sets the program counter to top of stack then subtracts 1 from the stack pointer
                this.programCounter = this.stack[this.stackPointer];
                this.stack[this.stackPointer] = 0; //may not be needed
                this.stackPointer--;
                break;
            case "JPaddr":
                //The interpreter sets the program counter to nnn.
                this.programCounter = (inputOpcode & 0x0FFF);
                break;
            case "CALLaddr":
                //The interpreter increments the stack pointer, then puts the current PC on the top of the stack.
                //Then the PC is then set to nnn.
                if (this.stackPointer < 15) { //not overflowed
                    this.stack[this.stackPointer++] = (this.programCounter >> 8) & 0xFF; // Push high byte
                    this.stack[this.stackPointer++] = this.programCounter & 0xFF; // Push low byte
                } //if
                else {
                    throw new Error('Stack overflow');
                } //else
                this.programCounter = (inputOpcode & 0x0FFF);
                break;
            case "SEVxbyte":
                //The interpreter compares register Vx to kk, and if they are equal, increments the program counter by 2.
                if (this.registers[x] == (inputOpcode && 0x00FF))
                    this.programCounter += 2;
                break;
            case "SNEVxbyte":
                //The interpreter compares register Vx to kk, and if they are not equal, increments the program counter by 2.
                if (this.registers[x] != (inputOpcode && 0x00FF))
                    this.programCounter += 2;
                break;
            case "SEVxVy":
                //The interpreter compares register Vx to register Vy, and if they are equal, increments the program counter by 2.
                if (this.registers[x] == this.registers[y])
                    this.programCounter += 2;
                break;
            case "LDVxbyte":
                //The interpreter puts the value kk into register Vx.
                this.registers[x] = (inputOpcode & 0xFF);
                break;
            case "ADDVxbyte":
                //Adds the value kk to the value of register Vx, then stores the result in Vx.
                this.registers[x] += (inputOpcode & 0xFF);
                break;
            case "LDVxVy":
                //Stores the value of register Vy in register Vx.
                this.registers[x] = this.registers[y];
                break;
            case "ORVxVy":
                //Performs a bitwise OR on the values of Vx and Vy, then stores the result in Vx. 
                //A bitwise OR compares the corresponding bits from two values, and if either bit is 1, then the same bit in the result is also 1. Otherwise, it is 0.
                this.registers[x] |= this.registers[y];
                break;
            case "ANDVxVy":
                //Performs a bitwise AND on the values of Vx and Vy, then stores the result in Vx.
                //A bitwise AND compares the corrseponding bits from two values, and if both bits are 1, then the same bit in the result is also 1. Otherwise, it is 0.
                this.registers[x] &= this.registers[y];
                break;
            case "XORVxVy":
                //Performs a bitwise exclusive OR on the values of Vx and Vy, then stores the result in Vx. 
                //An exclusive OR compares the corrseponding bits from two values, and if the bits are not both the same, then the corresponding bit in the result is set to 1. Otherwise, it is 0.
                this.registers[x] ^= this.registers[y];
                break;
            case "ADDVxVy":
                //The values of Vx and Vy are added together. If the result is greater than 8 bits (i.e., > 255,) VF is set to 1, otherwise 0. 
                //Only the lowest 8 bits of the result are kept, and stored in Vx.
                let sum = this.registers[x] += this.registers[y];
                this.registers[0xF] = 0;
                if (sum > 255)
                    this.registers[0xF] = 1;
                this.registers[x] = sum;
                break;
            case "SUBVxVy":
                //If Vx > Vy, then VF is set to 1, otherwise 0. Then Vy is subtracted from Vx, and the results stored in Vx.
                this.registers[0xF] = 0;
                if (this.registers[x] > this.registers[y])
                    this.registers[0xF] = 1;
                this.registers[x] -= this.registers[y];
                break;
            case "SHRVxVy":
                //If the least-significant bit of Vx is 1, then VF is set to 1, otherwise 0. Then Vx is divided by 2.
                this.registers[0xF] = 0;
                if ((this.registers[x] & 0xF) == 1)
                    this.registers[0xF] = 1;
                this.registers[x] /= 2;
                break;
            case "SUBNVxVy":
                //If Vy > Vx, then VF is set to 1, otherwise 0. Then Vx is subtracted from Vy, and the results stored in Vx.
                this.registers[0xF] = 0;
                if (this.registers[y] > this.registers[x])
                    this.registers[0xF] = 1;
                this.registers[x] = this.registers[y] - this.registers[x];
                break;
            case "SHLVxVy":
                //If the most-significant bit of Vx is 1, then VF is set to 1, otherwise to 0. Then Vx is multiplied by 2.
                this.registers[0xF] = 0;
                if ((this.registers[x] & 0x80) != 0)
                    this.registers[0xF] = 1;
                this.registers[x] *= 2;
                break;
            case "SNEVxVy":
                //The values of Vx and Vy are compared, and if they are not equal, the program counter is increased by 2.
                if (this.registers[x] != this.registers[y])
                    this.programCounter + 2;
                break;
            case "LDIaddr":
                //The value of register I is set to nnn
                this.indexRegister = (inputOpcode & 0x0FFF);
                break;
            case "JPV0addr":
                //The program counter is set to nnn plus the value of V0.
                this.programCounter = (inputOpcode & 0x0FFF) + this.registers[0];
                break;
            case "RNDVxbyte":
                //The interpreter generates a random number from 0 to 255, which is then ANDed with the value kk. The results are stored in Vx. See instruction 8xy2 for more information on AND.
                let randomNum = Math.floor(Math.random() * 0xFF);
                this.registers[x] = (randomNum & (inputOpcode & 0xFF));
                break;
            case "DRWVxVynibble":
                //The interpreter reads n bytes from memory, starting at the address stored in I. These bytes are then displayed as sprites on screen at coordinates (Vx, Vy). Sprites are XORed onto the existing screen. 
                //If this causes any pixels to be erased, VF is set to 1, otherwise it is set to 0. If the sprite is positioned so part of it is outside the coordinates of the display, it wraps around to the opposite side of the screen.
                let width = 8; //8 bits in sprite (ex: 11110000) for each row
                let height = (inputOpcode & 0xF); //take nibble and iterate through loop 
                this.registers[0xF]; //set 15th register
                for (let row = 0; row < height; row++) {
                    let newSprite = this._memory[this.indexRegister + row];
                    for (let col = 0; col < width; col++) {
                        if ((newSprite & 0x80) > 0) {
                            if (this._monitor.setPixel(this.registers[x], this.registers[y] + row))
                                this.registers[0xF] = 1; //if pixel has been cleared set to 1 - Collision Detection
                        } //if
                    } //for
                    newSprite <<= 1; //shift left so next bit can be processed                 
                } //for
                break;
            case "SKPVx":
                //Checks the keyboard, and if the key corresponding to the value of Vx is currently in the down position, PC is increased by 2.
                //Mostly done just need this function \/\/\/\/ to be made
                if (this._keyboard.isKeyPressed(this.registers[x]) == true)
                    this.programCounter += 2;
                break;
            case "SKNPVx":
                //Checks the keyboard, and if the key corresponding to the value of Vx is currently in the up position, PC is increased by 2.
                //Mostly done just need this function \/\/\/\/ to be made
                if (this._keyboard.isKeyPressed(this.registers[x]) == false)
                    this.programCounter += 2;
                break;
            case "LDVxDT":
                //The value of DT is placed into Vx.
                this.registers[x] = this.delayTimer;
                break;
            case "LDVxK":
                //!All execution stops until a key is pressed, then the value of that key is stored in Vx.
                //Need this instruction to be built \/\/\/
                break;
            case "LDDTVx":
                //DT is set equal to the value of Vx.
                this.delayTimer = this.registers[x];
                break;
            case "LDSTVx":
                //ST is set equal to the value of Vx.
                this.soundTimer = this.registers[x];
                break;
            case "ADDIVx":
                //The values of I and Vx are added, and the results are stored in I.
                this.indexRegister += this.registers[x];
                break;
            case "LDFVx":
                //The value of I is set to the location for the hexadecimal sprite corresponding to the value of Vx.
                this.registers[x] = this.indexRegister;
                break;
            case "LDBVx":
                //!The interpreter takes the decimal value of Vx, and places the hundreds digit in memory at location in I, the tens digit at location I+1, and the ones digit at location I+2.
                break;
            case "LDIVx":
                //The interpreter copies the values of registers V0 through Vx into memory, starting at the address in I.
                for (let i = 0; i <= x; i++)
                    this._memory[this.indexRegister + i] = this.registers[i];
                break;
            case "LDVxI":
                //The interpreter reads values from memory starting at location I into registers V0 through Vx.
                for (let i = 0; i <= x; i++)
                    this.registers[i] = this._memory[this.indexRegister + i];
                break;
            default:
                throw new Error('BAD INSTRUCTION!');
        } //switch
    } //execute
} //cpu
exports.cpu = cpu;

},{"./hardware":2}],2:[function(require,module,exports){
"use strict";
/*
    Hardware file
    Used to create hardware for Chip-8
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.hardware = void 0;
//hardware class -- parent class
class hardware {
    //hardware constructor -- builds different instances of the interpreters hardware
    constructor(id, name) {
        this.idNum = id;
        this.name = name;
        this.debug = true; //set default true
    }
    //log function --  outputs creation of hardware
    log(message) {
        //check if the debug flag is set
        if (this.debug) {
            let time = new Date().getMilliseconds();
            console.log("[HW - " + this.name + " id: " + this.idNum + " - " + time + "]: " + message);
        }
    }
    //setter function for debug
    setDebug(debugFlag) {
        this.debug = debugFlag;
    }
    //outputs hex properly
    hexlog(theNum, desiredLength, memAddress) {
        let hexNum = theNum.toString(16).toUpperCase(); //hex nums are 16 digits long
        //output error message
        if (theNum > 0xFF) {
            console.log("Address : 10000 Contains Value: ERR [hexValue conversion]: number undefined");
        }
        else {
            if (hexNum.length == 1) { //pads data in memory
                hexNum = '0x' + '0' + hexNum;
            }
            else {
                hexNum = '0x' + hexNum;
            }
        }
        let memHex = memAddress.toString(16).toUpperCase(); //creates and pads memory address location
        if (memHex.length == 1) {
            memHex = '0x000' + memAddress.toString(16).toUpperCase();
        }
        else {
            memHex = '0x00' + memAddress.toString(16).toUpperCase();
        }
        this.log("Memory Address " + memHex + " contains data " + hexNum);
    }
}
exports.hardware = hardware;

},{}],3:[function(require,module,exports){
"use strict";
/*
    memory file
    creates the Chip-8 memory and loads ROM
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.memory = void 0;
//import hardware and fs module. fs module allows reading and writing to files
const hardware_1 = require("./hardware");
//memory class -- child class of hardware
class memory extends hardware_1.hardware {
    //memory constructor -- creates the memory
    constructor(id, name) {
        super(id, name); //pass memory to hardware
        this.generalMemory = new Uint8Array(4096); //init general memory
        this.initSprites(); //initialize sprites
        this.loadSprites(); //load sprites into memory
    }
    //initializes the sprites array
    initSprites() {
        //per Austin Morlan fontset
        this.spriteArray = new Uint8Array([
            0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
            0x20, 0x60, 0x20, 0x20, 0x70, // 1
            0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
            0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
            0x90, 0x90, 0xF0, 0x10, 0x10, // 4
            0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
            0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
            0xF0, 0x10, 0x20, 0x40, 0x40, // 7
            0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
            0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
            0xF0, 0x90, 0xF0, 0x90, 0x90, // A
            0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
            0xF0, 0x80, 0x80, 0x80, 0xF0, // C
            0xE0, 0x90, 0x90, 0x90, 0xE0, // D
            0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
            0xF0, 0x80, 0xF0, 0x80, 0x80 // F
        ]);
    }
    //loads sprites into memory
    loadSprites() {
        for (let i = 0; i < this.spriteArray.length; i++) {
            this.generalMemory[0x000 + i] = this.spriteArray[i];
        }
    }
    //loads ROM data into a buffer
    async ROMBuffer(url) {
        try {
            const response = await fetch(url);
            const buffer = await response.arrayBuffer();
            const ROMbuf = new Uint8Array(buffer);
            this.Programsize = ROMbuf.length;
            this.loadROM(ROMbuf);
        }
        catch (error) {
            console.error("Error loading ROM:", error);
        }
    }
    // loads the buffer (ROM data) into memory
    loadROM(ROMbuf) {
        // Chip-8 programs start at location 0x200
        const startAddress = 0x200;
        // iterate through buf and add to mem
        for (let i = 0; i < ROMbuf.length; i++) {
            this.generalMemory[startAddress + i] = ROMbuf[i];
        }
    }
    //dumps the memory
    memDump(fromAddress) {
        this.log("Memory Dump");
        for (let i = fromAddress; i < this.Programsize; i++) {
            this.hexlog(this.generalMemory[i], 4, i);
        }
        this.log("Memory Dump: complete");
    }
    //program to test the memory
    test() {
        this.memDump(0x200);
    }
}
exports.memory = memory;

},{"./hardware":2}],4:[function(require,module,exports){
"use strict";
/*
    Monitor file.
    Referenced in index.html
    It will be our way of viewing the program

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitor = void 0;
//import hardware
const hardware_1 = require("./hardware");
class monitor extends hardware_1.hardware {
    //constructor
    constructor(id, name) {
        super(id, name); //passes monitor to hardware
        // CHIP-8 has a 64x32 pixel display
        this.cols = 64;
        this.rows = 32;
        this.scale = 15; // Scale up the pixel size 15x
        // create the 2D array to be filled with pixels
        this.display = [];
        for (let i = 0; i < this.cols; i++) {
            this.display[i] = [];
            for (let j = 0; j < this.rows; j++) {
                this.display[i][j] = 0;
            }
        }
        // create canvas for html with the correct size and scale
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.rows * this.scale;
        // creates an object with methods that allows for drawing on the canvas above
        this.canvasCtx = this.canvas.getContext('2d');
    } //constructor
    //Identifies the pixel at x,y and toggles it, returning the result of the toggle
    setPixel(x, y) {
        // Check if the input is wrapped around
        x = (x + this.cols) % this.cols;
        y = (y + this.rows) % this.rows;
        // toggle the value at the location
        this.display[x][y] ^= 1;
        // returns true if pixel has been turned off, false if turned on
        return this.display[x][y] === 0;
    } //setPixel
    // Clears the display
    clear() {
        // Reset all elements of the display array to 0
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.display[i][j] = 0;
            }
        }
    } //clear
    // Paint the canvas
    paintCanvas() {
        // Clear canvas and make it all black
        this.canvasCtx.fillStyle = '#FFF';
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // loop through array and update screen
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (this.display[x][y] === 1) {
                    let pixelX = x * this.scale;
                    let pixelY = y * this.scale;
                    // Determine if the pixel is on, and then represent that by making it white
                    this.canvasCtx.fillStyle = '#FFF';
                    this.canvasCtx.fillRect(pixelX, pixelY, this.scale, this.scale);
                }
            }
        }
    } //paintCanvas
    test() {
        this.paintCanvas();
        this.setPixel(0, 0);
        this.setPixel(5, 2);
    }
} //monitor
exports.monitor = monitor;

},{"./hardware":2}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.speaker = void 0;
const hardware_1 = require("./hardware");
//speaker class -- child class of hardware
class speaker extends hardware_1.hardware {
    //speaker constructor -- creates the components and variables for the speaker
    constructor(id, name) {
        super(id, name);
        /*
            not sure what is needed yet...
        */
    }
    //Functions needed - one to start sound and one to stop the sound)
    play() { }
    stop() { }
}
exports.speaker = speaker;

},{"./hardware":2}],6:[function(require,module,exports){
"use strict";
/*
    keyboard file
    Chip-8 machines had 16 key keyboard layouts
    Techmo -- references Techmo/Samson a character from the Cartoon Network series Regular show
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.techmoKeyboard = void 0;
//import hardware
const hardware_1 = require("./hardware");
//keyboard class - child class of hardware
class techmoKeyboard extends hardware_1.hardware {
    //keyboard constructor -- creates a keyboard and initializes its variables
    constructor(id, name) {
        super(id, name);
        this.keyboard = new Array(16);
        this.initKeyboard();
        this.keymap = {
            //key - input (per Cowgod 2.3)
            49: 0x1, // 1 - 1
            50: 0x2, // 2 - 2
            51: 0x3, // 3 - 3
            52: 0xc, // 4 - C
            81: 0x4, // Q - 4
            87: 0x5, // W - 5
            69: 0x6, // E - 6
            82: 0xd, // R - D
            65: 0x7, // A - 7
            83: 0x8, // S - 8
            68: 0x9, // D - 9
            70: 0xe, // F - E
            90: 0xa, // Z - A
            88: 0x0, // X - 0
            67: 0xb, // C - B
            86: 0xf // V - F
        }; //keymap
        //event listeners that handle keyboard input -- browser
        window.addEventListener('keydown', this.keyDown.bind(this), false);
        window.addEventListener('keyup', this.keyUp.bind(this), false);
    } //constructor
    //initializes all keyboard values to false
    initKeyboard() {
        for (let i = 0; i < this.keyboard.length; i++) {
            this.keyboard[i] = false;
        }
        //true == pressed
        //false == not pressed
    }
    //event listener -- looks to see if keys are up
    keyUp(event) {
        let keyPressed = this.keymap[event.key];
        this.keyboard[keyPressed] = false;
        // dow we need code for next key press?
    }
    //event listener -- looks to see if keys are being pushed down
    keyDown(event) {
        let keyPressed = this.keymap[event.key];
        this.keyboard[keyPressed] = true;
    }
    //is a certain key pressed?
    isKeyPressed(key) {
        return this.keyboard[key]; //returns key status
    }
} //techmoKeyboard
exports.techmoKeyboard = techmoKeyboard;

},{"./hardware":2}],7:[function(require,module,exports){
"use strict";
/*
    System file
    Used to turn the system on and off
    Also creates instances of hardware
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
//import hardware, cpu, and memory
const cpu_1 = require("./hardware/cpu");
const hardware_1 = require("./hardware/hardware");
const memory_1 = require("./hardware/memory");
const techmoKeyboard_1 = require("./hardware/techmoKeyboard");
const monitor_1 = require("./hardware/monitor");
const speaker_1 = require("./hardware/speaker");
//system class -- child class of hardware
class System extends hardware_1.hardware {
    //system constructor -- creates the system and instances of hardware(cpu, mem)
    constructor(id, name) {
        super(id, name); //pass system to hardware constructor
        this._mem = new memory_1.memory(0, "RAM"); //create new memory hardware
        this._keyboard = new techmoKeyboard_1.techmoKeyboard(0, "Keyboard"); //creates new keyboard hardware
        this._monitor = new monitor_1.monitor(0, "Monitor");
        this._speaker = new speaker_1.speaker(0, "Speaker");
        this._cpu = new cpu_1.cpu(0, "CPU", this._monitor, this._keyboard, this._speaker); //create new cpu hardware
        this.running = false;
        this.startSystem(); //start the system(press the power button)
    }
    //turn the system on and output what hardware was created
    startSystem() {
        this.log("created");
        this._cpu.log("created");
        this._mem.log("created");
        this._monitor.log("created");
        this._keyboard.log("Elevate Keyboard");
        this._mem.ROMBuffer("roms/SPACE_INVADERS");
        return true;
    }
    //turns the system off
    stopSystem() {
        return false;
    }
}
exports.System = System;
let system = new System(0, "System"); //create an instance of system

},{"./hardware/cpu":1,"./hardware/hardware":2,"./hardware/memory":3,"./hardware/monitor":4,"./hardware/speaker":5,"./hardware/techmoKeyboard":6}]},{},[7]);
