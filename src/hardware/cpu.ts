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

        //decode the opcode
        const instruction = this.decode(opcode);

        //run the instruction per opcode
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
      

    }//disassemble
}

//INSTRUCTION SET 
const INSTRUCTIONSET = [
/*
    TEMPLATE FOR INSTRUCTIONS ADD 36
    {
        id: 'INSTRUCTION_ID',
        name: 'INSTRUCTION_NAME',
        mask: 0x0000, // Set the appropriate mask
        pattern: 0x0000, // Set the appropriate pattern
        arguments: [
        { mask: 0x0000, shift: 0, type: 'TYPE' },
        { mask: 0x0000, shift: 0, type: 'TYPE' },
        ]
    },  
*/
    {
        id: 'SYS_ADDR', //Instruction #1
        name: 'SYS',
        mask: 0xf000, // Only the first digit (nibble) is significant
        pattern: 0x0000, // Since this instruction is ignored, the pattern is not relevant
        arguments: [
        { mask: 0x0fff, shift: 0, type: 'I' } // Address (NNN)
        ]
    },

    {
        id: 'CLS', //Instruction #2
        name: 'CLS',
        mask: 0xffff, // Full opcode is significant
        pattern: 0x00E0, // Opcode pattern for CLS
        arguments: [] // No arguments for CLS
      },

      {
        id: 'RET', //Instruction #3
        name: 'RET',
        mask: 0xffff, // Full opcode is significant
        pattern: 0x00EE, // Opcode pattern for RET
        arguments: [] // No arguments for RET
      },
      {
        id: 'JP_ADDR', //Instruction #4 - '1nnn'
        name: 'JP',
        mask: 0xf000, // Only the first digit (nibble) is significant
        pattern: 0x1000, // Pattern because its 1nnn
        arguments: [
            { mask: 0x0fff, shift: 0, type: 'addr' } // Address (NNN)
        ]
        },
        {   
        id: 'CALL_ADDR', //Instruction #5 - '2nnn'
        name: 'CaLL',
        mask: 0xf000, // Only the first digit (nibble) is significant
        pattern: 0x2000, // Pattern because its 2nnn
        arguments: [
            { mask: 0x0fff, shift: 0, type: 'addr' } // Address (addr)
        ]
        },
        { 
        id: 'ADD_VX_VY',
        name: 'ADD',
        mask: 0xf00f,
        pattern: 0x8004,
        arguments: [
      { mask: 0x0f00, shift: 8, type: 'R' },
      { mask: 0x00f0, shift: 4, type: 'R' },
    ]
},


]