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
        this.indexRegister 0x0000;
    }
}