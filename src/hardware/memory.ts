/*
    memory file
    creates the Chip-8 memory and loads ROM
*/

//import hardware and fs module. Imports module that allows reading and writing to files
import { System } from "../system";
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

    //loads ROM data into a buffer
    public ROMBuffer(filename: string){
        const file = fs.readFileSync(filename);

        //error checking
        if(!file){
            console.log("File Error");
        }

        const buffer: number[] = [];

        for(let i = 0; i < file.length; ++i){
            buffer.push(file[i]);
        }

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

        this.test();
    }

    //dumps the memory
    public memDump(fromAddress: number, toAddress: number){
        this.log("Memory Dump")
        for(let i = fromAddress; i <= toAddress; i++){
            //call hex log function
        }
        this.log("Memory Dump: complete");
    }

    //test the memory
    private test(){
        this.memDump(0x200, 0xFFF);
    }
}