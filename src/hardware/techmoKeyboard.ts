/*
    keyboard file
    Chip-8 machines had 16 key keyboard layouts
    Techmo -- references Techmo/Samson a character from the Cartoon Network series Regular show
*/

//import hardware
import { hardware } from "./hardware";

//keyboard class - child class of hardware
export class techmoKeyboard extends hardware{
    keyboard: boolean[];    //boolean array to show which keys are currently being pressed
    keymap: any; //map of all the keys

    //keyboard constructor -- creates a keyboard and initializes its variables
    constructor(id: number, name: string){
        super(id, name);
        this.keyboard = new Array(16);
        this.initKeyboard();
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

        //event listeners that handle keyboard input -- browser
        window.addEventListener('keydown', this.keyDown.bind(this), false);
        window.addEventListener('keyup', this.keyUp.bind(this), false);
    }//constructor

    //initializes all keyboard values to false
    private initKeyboard(){
        for(let i = 0; i < this.keyboard.length; i++){
            this.keyboard[i] = false;
        }

        //true == pressed
        //false == not pressed
    }

    //event listener -- looks to see if keys are up
    keyUp(event){
        let keyPressed: number = this.keymap[event.key];
        this.keyboard[keyPressed] = false;

        // dow we need code for next key press?
    }

    //event listener -- looks to see if keys are being pushed down
    keyDown(event){
        let keyPressed: number = this.keymap[event.key];
        this.keyboard[keyPressed] = true;
    }
    
    //is a certain key pressed?
    public isKeyPressed(key: number): boolean{
        return this.keyboard[key];  //returns key status
    }
    //Missing a function (see note line 402 in cpu)

}//techmoKeyboard