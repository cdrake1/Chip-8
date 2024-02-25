/*
    memory file
    creates the Chip-8 memory and allocates it accordingly
*/

//import hardware
import { hardware } from "./hardware";

//memory class -- child class of hardware
export class mem extends hardware{

    //memory constructor -- creates the memory
    constructor(id: number, name: string){
        super(id, name);    //pass memory to hardware
    }

    //dumps the memory
    public memDump(){}
}