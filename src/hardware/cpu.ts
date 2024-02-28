/*
    Cpu file
    Creates the Chip-8 cpu
    This is where the magic happens
*/

//import hardware and memory
import { hardware } from "./hardware";
import { memory } from "./memory";

//cpu class -- child class of hardware
export class cpu extends hardware{
    registers: Uint8Array;  //16 8-bit registers
    stack: Uint8Array;  //keeps track of subroutines and order of execution
    programCounter: number; //16-bit program counter -- holds address of next instruction
    stackPointer: number;   //8-bit int that points to location within the stack
    indexRegister: number;  //16-bit memory address pointer

    //cpu constructor -- creates the cpu and initializes its variables
    constructor(id: number, name: string) {
        super(id, name);    //passes cpu to hardware
        this.registers = new Uint8Array(16);
        this.stack  = new Uint8Array(16);
        this.programCounter  = 0x200;
        this.stackPointer = 0x00;
        this.indexRegister = 0x0000;
    }

    //Call and coordinate fetch, decode and execute
    public step()
    {
        //Fetch the opcode
        const opcode = this.fetch();

        //switch match opcode to instruction
        const instruction = this.decode(opcode);

        //run the instruction
        this.execute(instruction);
        
    }//step
  
    //Get address from memory
    public fetch()
    {return(memory[this.programCounter]);}//fetch

    //decode opcode
    public decode(Inputopcode)
    {return this.disassemble(Inputopcode);}//decode

    //Execute the Instruction with 36 Switch Cases
    public execute(Inputinstruction)
    {

    }//execute

    //find instruction from opcode
    public disassemble(inputOpcode)
    {
        const x = (inputOpcode & 0x0F00) >> 8; //determine x because it is a common reference among instructions
        const y = (inputOpcode & 0x00F0) >> 4; //determine y because it is a common reference among instructions

        switch(inputOpcode & 0xF000) //Were going to check for a match at the first digit
        {
        case 0x0000:
            switch(inputOpcode) //test for which of 0x0000 it is
            {
                case 0x00E0:
                    //CLR
                    break;
                case 0x00EE:
                    //RET
                    break;
            }//switch
            break;
        case 0x1000:
            //JP addr
            break;
        case 0x2000:
            //CALL addr
            break;
        case 0x3000:
            //SE Vx, byte
            break;
        case 0x4000:
            //SNE Vx, byte
        case 0x5000:
            //SE Vx, Vy
            break;
        case 0x6000:
            //LD Vx, byte
        case 0x7000:
            // ADD Vx, byte
        case 0x8000:
            switch(inputOpcode & 0xF00F) //test for which of 0x8000 it is
                {
                    case 0x8000:
                        //LD Vx, Vy
                        break;
                    case 0x8001:
                        //OR Vx, Vy
                        break;
                    case 0x8002:
                        //AND Vx, Vy
                        break;
                    case 0x8003:
                        //XOR Vx, Vy
                        break;
                    case 0x8004:
                        //ADD Vx,Vy
                        break;
                    case 0x8005:
                        //SUB Vx, Vy
                        break;
                    case 0x8006:
                        //SHR Vx {, Vy}
                        break;
                    case 0x8007:
                        //SUBN Vx, Vy
                        break;
                    case 0x800E:
                        //SHL Vx {, Vy}
                        break;
                    default:
                        throw new Error('BAD OPCODE');
                    }//switch
            break;
        case 0x9000:
            //SNME Vx, Vy
            break;
        case 0xA000:
            //LD I, addr
            break;
        case 0xB000:
            //JP V0, addr
            break;
        case 0xC000:
            //RND Vx, byte
            break;
        case 0xD000:
            //DRW Vx, Vy, nibble
        case 0xF000:
            switch(inputOpcode & 0xFF) // check last two digits
            {
                case 0x9E:
                    //SKP Vx
                    break;
                case 0xA1:
                    //SKNP Vx
                    break;
                case 0x07:
                    //LD Vx, DT
                    break;
                case 0x0A:
                    //LD Vx, K
                    break;
                case 0x15:
                    //LD DT, Vx
                    break;
                case 0x18:
                    //LD ST, Vx
                    break;
                case 0x1E:
                    //ADD I, Vx
                    break;
                case 0x29:
                    //LD F, Vx
                    break;
                case 0x33:
                    //LD B, Vx
                    break;
                case 0x55:
                    //LD [I]. Vx
                case 0x65:
                    //LD Vx, [I]
                    break;
                default:
                    throw new Error('BAD OPCODE!!');
            }//switch
              
        }//switch

    }//disassemble
}//cpu