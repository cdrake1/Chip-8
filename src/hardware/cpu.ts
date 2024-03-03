/*
    Cpu file
    Creates the Chip-8 cpu
    This is where the magic happens
*/

//import hardware and memory
import { hardware } from "./hardware";
import { memory } from "./memory";
import { monitor } from "./monitor";
import { techmoKeyboard } from "./techmoKeyboard";

//cpu class -- child class of hardware
export class cpu extends hardware{
    registers: Uint8Array;  //16 8-bit registers
    stack: Uint8Array;  //keeps track of subroutines and order of execution
    programCounter: number; //16-bit program counter -- holds address of next instruction
    stackPointer: number;   //8-bit int that points to location within the stack
    indexRegister: number;  //16-bit memory address pointer
    delayTimer: number; //This timer does nothing more than subtract 1 from the value of DT at a rate of 60Hz
    soundTimer: number; //This timer also decrements at a rate of 60Hz, however, as long as ST's value is greater than zero, the Chip-8 buzzer will sound
    cpuSpeed: number; //CPU Speed
    paused: boolean; //To pause system
    _monitor: monitor; //Monitor instance
    _memory: memory;
    _keyboard: techmoKeyboard;
    

    //cpu constructor -- creates the cpu and initializes its variables
    constructor(id: number, name: string, _monitor: monitor,_keyboard: techmoKeyboard) {
        super(id, name);    //passes cpu to hardware
        this.registers = new Uint8Array(16);
        this.stack  = new Uint8Array(16);
        this.programCounter  = 0x200;
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
    updateTimers()
    {
        if(this.delayTimer > 0)
            this.delayTimer--;
        if(this.soundTimer)
            this.soundTimer--;
    }
    
    //Call and coordinate fetch, decode and execute
    //SWITCH CASING WILL BE EXTREMELY REPETITIVE, BUT I WANT TO SHOW ALL 3 STEPS SEPERATELY
    step()
    {
        //Fetch the opcode
        const opcode = this.fetch();

        //switch match opcode to instruction
        const instruction = this.decode(opcode);

        //run the instruction
        this.execute(instruction,opcode);

        //every step we update canvas, timers and play a sound
        if(this.paused != true)
            this.updateTimers();
        //playsoundhere ->
        this._monitor.paintCanvas();
    }//step
  
    //Get address from memory
    fetch()
    {
        for(let i =0; i< this.cpuSpeed; i++)
        {
            if(this.paused != true)
            {
                let opcode = (this._memory[this.programCounter] << 8 | this._memory[this.programCounter+1]) //build opcode using or (opcode consists of two byte)
                return(opcode);
            }//if
        }//for
    }//fetch

    //decode opcode
    decode(inputOpcode: number)
    {return this.disassemble(inputOpcode);}//decode

    //find instruction from opcode
    disassemble(inputOpcode: number)
    {
        let inputInstruction = "null";
        switch(inputOpcode & 0xF000) //Were going to check for a match at the first digit
        {
        case 0x0000:
            switch(inputOpcode) //test for which of 0x0000 it is
            {
                case 0x00E0:
                    inputInstruction = "CLR";
                    break;
                case 0x00EE:
                    inputInstruction = "RET";
                    break;
            }//switch
            break;
        case 0x1000:
            inputInstruction = "JPaddr";
            break;
        case 0x2000:
            inputInstruction = "CALLaddr";
            break;
        case 0x3000:
            inputInstruction ="SEVxbyte";
            break;
        case 0x4000:
            inputInstruction = "SNEVxbyte";
        case 0x5000:
            inputInstruction = "SEVxVy";
            break;
        case 0x6000:
            inputInstruction= "LDVxbyte";
        case 0x7000:
            inputInstruction = "ADDVxbyte";
        case 0x8000:
            switch(inputOpcode & 0xF00F) //test for which of 0x8000 it is
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
                    }//switch
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
            switch(inputOpcode & 0xFF) // check last two digits
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
            }//switch
              
        }//switch
        return(inputInstruction);
        }//disassemble

    //Execute the Instruction with 36 Switch Cases
    execute(inputInstruction: string,inputOpcode: number)
    {
        this.programCounter += 2;
        const x = (inputOpcode & 0x0F00) >> 8; //determine x because it is a common reference among instructions
        const y = (inputOpcode & 0x00F0) >> 4; //determine y because it is a common reference among instructions
        switch(inputInstruction)
        {
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
                }//if
                else {
                    throw new Error('Stack overflow');
                }//else
                this.programCounter = (inputOpcode & 0x0FFF);
                break;
            case "SEVxbyte":
            //The interpreter compares register Vx to kk, and if they are equal, increments the program counter by 2.
                if(this.registers[x] == (inputOpcode && 0x00FF))
                    this.programCounter += 2;
                break;
            case "SNEVxbyte":
            //The interpreter compares register Vx to kk, and if they are not equal, increments the program counter by 2.
                if(this.registers[x] != (inputOpcode && 0x00FF))
                    this.programCounter += 2;
                break;
            case "SEVxVy":
            //The interpreter compares register Vx to register Vy, and if they are equal, increments the program counter by 2.
                if(this.registers[x] == this.registers[y])
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
                this.registers[x] = this.registers[y]
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
                let sum = this.registers[x] += this.registers[y]
                this.registers[0xF] = 0;
                if(sum > 255)
                    this.registers[0xF] = 1;
                this.registers[x] = sum;
                break;
            case "SUBVxVy":
            //If Vx > Vy, then VF is set to 1, otherwise 0. Then Vy is subtracted from Vx, and the results stored in Vx.
                this.registers[0xF] = 0;
                if(this.registers[x] > this.registers[y])
                    this.registers[0xF] = 1;
                this.registers[x] -= this.registers[y];
                break;
            case "SHRVxVy":
            //If the least-significant bit of Vx is 1, then VF is set to 1, otherwise 0. Then Vx is divided by 2.
                this.registers[0xF] = 0;
                if((this.registers[x] & 0xF) == 1)
                    this.registers[0xF] = 1;
                this.registers[x] /= 2;
                break;
            case "SUBNVxVy":
            //If Vy > Vx, then VF is set to 1, otherwise 0. Then Vx is subtracted from Vy, and the results stored in Vx.
                this.registers[0xF] = 0;
                if(this.registers[y] > this.registers[x])
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
                if(this.registers[x] != this.registers[y])
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
                let randomNum = Math.floor(Math.random() * 0xFF)
                this.registers[x] = (randomNum & (inputOpcode & 0xFF));
                break;
            case "DRWVxVynibble":
            //The interpreter reads n bytes from memory, starting at the address stored in I. These bytes are then displayed as sprites on screen at coordinates (Vx, Vy). Sprites are XORed onto the existing screen. 
            //If this causes any pixels to be erased, VF is set to 1, otherwise it is set to 0. If the sprite is positioned so part of it is outside the coordinates of the display, it wraps around to the opposite side of the screen.
                let width = 8; //8 bits in sprite (ex: 11110000) for each row
                let height = (inputOpcode & 0xF); //take nibble and iterate through loop 

                this.registers[0xF]; //set 15th register
                for(let row = 0; row < height; row++)
                {
                    let newSprite = this._memory[this.indexRegister + row]   
                    for(let col = 0;col< width;col++)
                    {
                        if((newSprite & 0x80) > 0)
                        {
                            if(this._monitor.setPixel(this.registers[x],this.registers[y]+row))
                                this.registers[0xF] = 1; //if pixel has been cleared set to 1 - Collision Detection
                        }//if
                    }//for
                    newSprite <<= 1; //shift left so next bit can be processed                 
                }//for
                break;
            case "SKPVx":
            //!Checks the keyboard, and if the key corresponding to the value of Vx is currently in the down position, PC is increased by 2.
            //Mostly done just need this function \/\/\/\/ to be made
                if(this._keyboard.isKeyPressed(this.registers[x]) == true)
                    this.programCounter += 2;
                break;
            case "SKNPVx":
            //!Checks the keyboard, and if the key corresponding to the value of Vx is currently in the up position, PC is increased by 2.
            //Mostly done just need this function \/\/\/\/ to be made
                if(this._keyboard.isKeyPressed(this.registers[x]) == false)
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
                for(let i = 0;i <= x;i++)
                    this._memory[this.indexRegister + i] = this.registers[i];
                break;
            case "LDVxI":
            //The interpreter reads values from memory starting at location I into registers V0 through Vx.
                    for(let i = 0;i <= x;i++)
                    this.registers[i] = this._memory[this.indexRegister + i];
                break;
            default:
                throw new Error('BAD INSTRUCTION!');
        }//switch
  
    }//execute
}//cpu