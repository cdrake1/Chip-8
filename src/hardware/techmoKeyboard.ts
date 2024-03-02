/*
    keyboard file
    Chip-8 machines had 16 key keyboard layouts
    Techmo -- references Techmo/Samson a character from the Cartoon Network series Regular show
*/

//import hardware
import { hardware } from "./hardware";
import { cpu } from "./cpu";

//keyboard class - child class of hardware
export class techmoKeyboard extends hardware{
    keyboard: Uint8Array;
    keymap: any; //!not sure how to initialize dictionary so went with any should work fine?
    keysPressed: number[];
    //keyboard constructor -- creates a keyboard and initializes its variables
    constructor(id: number, name: string){
        super(id, name);
        this.keyboard = new Uint8Array(16);
        this.keymap = {
                     //key - input (per Cowgod 2.3)
            49: 0x1, // 1 - 1
            50: 0x2, // 2 - 2
            51: 0x3, // 3 - 3
            52: 0xc, // 4 - C
            81: 0x4, // Q - 4
            87: 0x5, // W - 5
            69: 0x6, // E - 6
            82: 0xd, // R - D
            65: 0x7, // A - 7
            83: 0x8, // S - 8
            68: 0x9, // D - 9
            70: 0xe, // F - E
            90: 0xa, // Z - A
            88: 0x0, // X - 0
            67: 0xb, // C - B
            86: 0xf // V - F
        }; //keymap
    }//constructor
       
    
}//techmoKeyboard