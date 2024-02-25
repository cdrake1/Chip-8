/*
    Cpu file
    Creates the Chip-8 cpu
    This is where the magic happens
*/

//import hardware
import { hardware } from "./hardware";

//cpu class -- child class of hardware
export class cpu extends hardware{
    registers: number[] = new Array(16); //16 8-bit registers
    stack: number[] = new Array(16);
    programCounter: number = 0x0000; //program counter

    //cpu constructor -- creates the cpu and initializes its variables
    constructor(id: number, name: string) {
        super(id, name);  //passes cpu to hardware
    }
}