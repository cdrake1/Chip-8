/*
    keyboard file
    Chip-8 machines had 16 key keyboard layouts
    Techmo -- references Techmo/Samson a character from the Cartoon Network series Regular show
*/

//import hardware
import { hardware } from "./hardware";

//keyboard class - child class of hardware
export class techmoKeyboard extends hardware{
    keyboard: Uint8Array;

    //keyboard constructor -- creates a keyboard and initializes its variables
    constructor(id: number, name: string){
        super(id, name);
        this.keyboard = new Uint8Array(16);
    }
}