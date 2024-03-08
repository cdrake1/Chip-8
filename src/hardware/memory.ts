/*
    memory file
    creates the Chip-8 memory and loads ROM
*/

//import hardware and fs module. fs module allows reading and writing to files
import { hardware } from "./hardware";

//memory class -- child class of hardware
export class memory extends hardware{
    generalMemory: Uint8Array;  //general memory
    spriteArray: Uint8Array; //contains 5 bytes for each of the 16 sprites
    Programsize: number; //size of ROM
    ROMBuf: Uint8Array; //ROM buffer

    //memory constructor -- creates the memory
    constructor(id: number, name: string){
        super(id, name);    //pass memory to hardware
        this.generalMemory = new Uint8Array(4096);  //init general memory
        this.initSprites(); //initialize sprites
        this.loadSprites(); //load sprites into memory
    }

    //initializes the sprites array
    public initSprites(){
        //per Austin Morlan fontset
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
    public async ROMBuffer(path: string) {
        console.log(path);
        try {
            const response = await fetch(path);
            const buffer = await response.arrayBuffer();
            this.ROMBuf = new Uint8Array(buffer);
            this.Programsize = this.ROMBuf.length;
            this.loadROM();
        } catch (error) {
            console.error("Error loading ROM:", error);
        }
    }
    

    // loads the buffer (ROM data) into memory
    public loadROM() {
        // Chip-8 programs start at location 0x200
        const startAddress: number = 0x200;

        // iterate through buf and add to mem
        for (let i = 0; i < this.ROMBuf.length; i++) {
            this.generalMemory[startAddress + i] = this.ROMBuf[i];
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