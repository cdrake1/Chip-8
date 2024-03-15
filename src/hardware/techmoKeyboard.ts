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

        // Enable raw mode to capture key events
        process.stdin.setRawMode(true);

        // Resume stdin to begin reading
        process.stdin.resume();

        // Listen for 'data' events on stdin (keypresses)
        process.stdin.on('data', (key) => this.handleInput(key.toString()));
    }//constructor

    //initializes all keyboard values to false
    private initKeyboard(){
        for(let i = 0; i < this.keyboard.length; i++){
            this.keyboard[i] = false;
        }

        //true == pressed
        //false == not pressed
    }

    private handleInput(key: string) {
        // Handle Ctrl+C to exit the process
        if (key === '\u0003') {
            process.exit();
        }//if

        // Check if the pressed key has a mapping in the keymap
        const keyPressed = this.keymap[key.toLowerCase()];
        if (keyPressed !== undefined) {
            // Toggle the state of the corresponding key in the keyboard array
            this.keyboard[keyPressed] = !this.keyboard[keyPressed];
        }//if
    }//handleInput

    public isKeyPressed(key: number): boolean {
        // Check if a specific key is currently pressed
        return this.keyboard[key];
    }//isKeyPressed

    public waitForKeyPress(): number {
        let pressedKey: number | undefined;
        // Synchronously wait for a key press
        while (pressedKey === undefined) {
            //might want to add timer here? 
        }
        return pressedKey;
    }
}//techmoKeyboard
   

