/*
    memory file
    creates the Chip-8 memory and loads ROM
*/

//import hardware and fs module. fs module allows reading and writing to files
import { hardware } from "./hardware";
import * as fs from 'fs';

export class memory extends hardware {
    generalMemory: Uint8Array;
    spriteArray: Uint8Array;
    Programsize: number;
    ROMBuf: Uint8Array;

    constructor(id: number, name: string) {
        super(id, name);
        this.generalMemory = new Uint8Array(4096);
        this.initSprites();
        this.loadSprites();
    }

    public initSprites() {
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
        ]);
    }

    public loadSprites() {
        for (let i = 0; i < this.spriteArray.length; i++) {
            this.generalMemory[0x000 + i] = this.spriteArray[i];
        }
    }

    // Modified ROMBuffer method to be async
    public async ROMBuffer(filePath: string) {
        console.log(filePath);
        try {
            // Read the file asynchronously
            const fileContent = await fs.promises.readFile(filePath, 'utf-8');
            this.loadROM(fileContent);
        } catch (error) {
            console.error("Error loading ROM:", error);
        }
    }

    //loadROM method to set ROM loading flag and size
    public loadROM(fileContent: string) {
        const lines = fileContent.split('\n');
        let address = 0x200;
    
        //might be cause of issue, this code loads the bytes into the array
        lines.forEach(line => {
            const hexValues = line.trim().split(/\s+/);
            hexValues.forEach(hexValue => {
                const byte = parseInt(hexValue, 16);
                this.generalMemory[address++] = byte;
            });
        });
    
        this.Programsize = address - 0x200;
        this.printGeneralMemory();
    }
    
    // Method to print the general memory
    public printGeneralMemory() {
        console.log("General Memory:");
        for (let i = 0; i < this.generalMemory.length; i += 16) {
            let line = "";
            for (let j = 0; j < 16; j++) {
                const byte = this.generalMemory[i + j];
                line += byte.toString(16).padStart(2, '0').toUpperCase() + " ";
            }
            console.log(line.trim());
        }
    }

    // Public method to check if ROM is loaded
    public isROMLoaded(): boolean {
        return this.Programsize !== undefined && this.Programsize > 0;
    }

    // Method to wait until ROM is loaded
    public async waitForROM(): Promise<void> {
        while (!this.isROMLoaded()) {
            // Wait for a short interval before checking again
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}
