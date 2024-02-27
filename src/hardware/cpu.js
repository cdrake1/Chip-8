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
const memory_1 = require("./memory");
//cpu class -- child class of hardware
class cpu extends hardware_1.hardware {
    //cpu constructor -- creates the cpu and initializes its variables
    constructor(id, name) {
        super(id, name); //passes cpu to hardware
        this.registers = new Uint8Array(16);
        this.stack = new Uint8Array(16);
        this.programCounter = 0x200;
        this.stackPointer = 0x00;
        this.indexRegister = 0x0000;
    }
    //Call and coordinate fetch, decode and execute
    step() {
        //Fetch the opcode
        const opcode = this.fetch();
        //decode the opcode
        const instruction = this.decode(opcode);
        //run the instruction per opcode
        this.execute(instruction);
    } //step
    //Get address from memory
    fetch() { return (memory_1.memory[this.programCounter]); } //fetch
    //decode opcode
    decode(Inputopcode) { return this.disassemble(Inputopcode); } //decode
    //Execute the Instruction with 36 Switch Cases
    execute(Inputinstruction) {
    } //execute
    //find instruction from opcode
    disassemble(inputOpcode) {
    } //disassemble
}
exports.cpu = cpu;
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
    { id: 'ADD_VX_VY',
        name: 'ADD',
        mask: 0xf00f,
        pattern: 0x8004,
        arguments: [
            { mask: 0x0f00, shift: 8, type: 'R' },
            { mask: 0x00f0, shift: 4, type: 'R' },
        ]
    },
];
//# sourceMappingURL=cpu.js.map