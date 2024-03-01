/*
    Cpu file
    Creates the Chip-8 cpu
    This is where the magic happens
*/

//import hardware and memory
import { hardware } from "./hardware";
import { memory } from "./memory";
import { monitor } from "./monitor";

//cpu class -- child class of hardware
export class cpu extends hardware{
    registers: Uint8Array;  //16 8-bit registers
    stack: Uint8Array;  //keeps track of subroutines and order of execution
    programCounter: number; //16-bit program counter -- holds address of next instruction
    stackPointer: number;   //8-bit int that points to location within the stack
    indexRegister: number;  //16-bit memory address pointer
    _monitor: monitor; //Monitor instance

    //cpu constructor -- creates the cpu and initializes its variables
    constructor(id: number, name: string,_monitor: monitor) {
        super(id, name);    //passes cpu to hardware
        this.registers = new Uint8Array(16);
        this.stack  = new Uint8Array(16);
        this.programCounter  = 0x200;
        this.stackPointer = 0x00;
        this.indexRegister = 0x0000;
        this._monitor = _monitor;
        
    }

    //Call and coordinate fetch, decode and execute
    //SWITCH CASING WILL BE EXTREMELY REPETITIVE, BUT I WANT TO SHOW ALL 3 STEPS SEPERATELY
    public step()
    {
        //Fetch the opcode
        const opcode = this.fetch();

        //switch match opcode to instruction
        const instruction = this.decode(opcode);

        //run the instruction
        this.execute(instruction,opcode);
        
    }//step
  
    //Get address from memory
    public fetch()
    {return(memory[this.programCounter]);}//fetch

    //decode opcode
    public decode(inputOpcode)
    {return this.disassemble(inputOpcode);}//decode

    //find instruction from opcode
    public disassemble(inputOpcode)
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
    public execute(inputInstruction,inputOpcode)
    {
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
                this.registers[x] = (inputOpcode & 0x00FF);
                break;
            case "ADDVxbyte":
//Adds the value kk to the value of register Vx, then stores the result in Vx.
                this.registers[x] += (inputOpcode & 0x00FF);
                break;
            case "LDVxVy":
//Stores the value of register Vy in register Vx.
                this.registers[x] = this.registers[y]
                break;
            case "ORVxVy":
                break;
            case "VxVy":
                break;
            case "XORVxVy":
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
                break;
            case "SUBNVxVy":
//If Vy > Vx, then VF is set to 1, otherwise 0. Then Vx is subtracted from Vy, and the results stored in Vx.
                this.registers[0xF] = 0;
                if(this.registers[y] > this.registers[x])
                    this.registers[0xF] = 1;
                this.registers[x] = this.registers[y] - this.registers[x];
                break;
            case "SHLVxVy":
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
                break;
            case "DRWVxVynibble":
                break;
            case "SKPVx":
                break;
            case "SKNPVx":
                break;
            case "LDVxDT":
                break;
            case "LDVxK":
                break;
            case "LDDTVx":
                break;
            case "LDSTVx":
                break;
            case "ADDIVx":
                break;
            case "LDFVx":
                break;
            case "LDBVx":
                break;
            case "LDIVx":
                break;
            case "LDVxI":
                break;
            default:
                throw new Error('BAD INSTRUCTION!');
        }//switch
  
    }//execute
}//cpu