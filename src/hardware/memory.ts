/*
    memory file
    creates the Chip-8 memory and loads ROM
*/

//import hardware
import { hardware } from "./hardware";

//memory class -- child class of hardware
export class memory extends hardware{
    generalMemory: Uint8Array;  //general memory

    //memory constructor -- creates the memory
    constructor(id: number, name: string){
        super(id, name);    //pass memory to hardware
        this.generalMemory = new Uint8Array(4096);
    }

    //dumps the memory
    public memDump(){}
}