/*
    Cpu file
    Creates the Chip-8 cpu
    This is where the magic happens
*/

//import hardware
import { hardware } from "./hardware";

//cpu class -- child class of hardware
export class cpu extends hardware {
    programCounter: number = 0x200; //program counter

    //cpu constructor -- creates the cpu and initializes its variables
    constructor(id: number, name: string) {
      super(id, name);  //passes cpu to hardware
    }

    //fetch the instruction
    public fetch(){}

    //decode the instruction
    public decode(){}

    //execute the instruction
    public excute(){}
  }