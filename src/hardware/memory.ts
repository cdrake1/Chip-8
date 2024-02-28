/*
    memory file
    creates the Chip-8 memory and loads ROM
*/

//import hardware and fs module. Imports module that allows reading and writing to files
import { hardware } from "./hardware";
import * as fs from 'fs';

//memory class -- child class of hardware
export class memory extends hardware{
    generalMemory: Uint8Array;  //general memory

    //memory constructor -- creates the memory
    constructor(id: number, name: string){
        super(id, name);    //pass memory to hardware
        this.generalMemory = new Uint8Array(4096);
    }

    //loads the buffer (ROM data) into memory
    public loadROM(ROMbuf: number[]){
        //iterate through buf and add to mem
    }

    //loads ROM data into a buffer
    public ROMBuffer(filename: string){
        const file = fs.readFileSync(filename);
        const buffer: number[] = [];

        for(let i = 0; i < file.length; ++i){
            buffer.push(file[i]);
        }

        this.loadROM(buffer);
    }

    //dumps the memory
    public memDump(fromAddress: number, toAddress: number){
        this.log("Memory Dump")
        for(let i = fromAddress; i <= toAddress; i++){
            this.hexlog(this.generalMemory[i], 4, i);
        }
        this.log("Memory Dump: complete");
    }
}