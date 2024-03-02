/*
    memory file
    creates the Chip-8 memory and loads ROM
*/

//import hardware and fs module. fs module allows reading and writing to files
import { hardware } from "./hardware";
import * as fs from 'fs';

//memory class -- child class of hardware
export class memory extends hardware{
    generalMemory: Uint8Array;  //general memory
    spriteArray: Uint8Array; //contains 5 bytes for each of the 16 sprites
    Programsize: number; //size of ROM

    //memory constructor -- creates the memory
    constructor(id: number, name: string){
        super(id, name);    //pass memory to hardware
        this.generalMemory = new Uint8Array(4096);  //init general memory
        this.initSprites(); //initialize sprites
        this.loadSprites(); //load sprites into memory
    }

    //initializes the sprites array
    public initSprites(){
        this.spriteArray = new Uint8Array([
            0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
            0x20, 0x60, 0x20, 0x20, 0x70, // 1
            0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
            0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
            0x90, 0x90, 0xF0, 0x10, 0x10, // 4
            0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
            0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
            0xF0, 0x10, 0x20, 0x40, 0x40, // 7
            0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
            0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
            0xF0, 0x90, 0xF0, 0x90, 0x90, // A
            0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
            0xF0, 0x80, 0x80, 0x80, 0xF0, // C
            0xE0, 0x90, 0x90, 0x90, 0xE0, // D
            0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
            0xF0, 0x80, 0xF0, 0x80, 0x80  // F
        ])
    }

    //loads sprites into memory
    public loadSprites(){
        for(let i = 0; i < this.spriteArray.length; i++){
            this.generalMemory[0x000 + i] = this.spriteArray[i];
        }
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