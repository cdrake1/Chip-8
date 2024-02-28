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
    Programsize: number;

    //memory constructor -- creates the memory
    constructor(id: number, name: string){
        super(id, name);    //pass memory to hardware
        this.generalMemory = new Uint8Array(4096);
    }

    //loads ROM data into a buffer
    public ROMBuffer(filename: string){
        const file = fs.readFileSync(filename);

        //error checking
        if(!file){
            throw new Error("Something went wrong when trying to read the file " + filename);
        }

        const buffer: number[] = [];

        for(let i = 0; i < file.length; ++i){
            buffer.push(file[i]);
        }
        this.Programsize = buffer.length;
        this.loadROM(buffer);
    }

    //loads the buffer (ROM data) into memory
    public loadROM(ROMbuf: number[]){

        //Chip-8 programs start at location 0x200
        const startAddress: number = 0x200;

        //iterate through buf and add to mem
        for(let i = 0; i < ROMbuf.length; i++){
            this.generalMemory[startAddress + i] = ROMbuf[i];
        }

        //this.test();
    }

    //dumps the memory
    public memDump(fromAddress: number){
        this.log("Memory Dump")
        for(let i = fromAddress; i < this.Programsize; i++){
            this.hexlog(this.generalMemory[i], 4, i);
        }
        this.log("Memory Dump: complete");
    }

    //program to test the memory
    private test(){
        this.memDump(0x200);
    }
}