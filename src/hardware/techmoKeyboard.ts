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
    }//constructor

    //initializes all keyboard values to false
    private initKeyboard(){
        for(let i = 0; i < this.keyboard.length; i++){
            this.keyboard[i] = false;
        }

        //true == pressed
        //false == not pressed
    }

    private monitorKeys() {
        /*
            character stream from stdin code (most of the contents of this function) taken from here
            https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin
            This takes care of the simulation we need to do to capture stdin from the console and retrieve the character.
            Then we can put it in keyspressed
         */
        var stdin = process.stdin;
        stdin.setRawMode( true ); //without this, we would only get streams once enter is pressed
        stdin.resume();
        stdin.setEncoding(null);

        stdin.on( 'data', function( key ){
            let keyPressed = key.toString();    //turn key pressed to string

            //check if that key is within the map
            if(this.keymap.has(keyPressed)){
                let pressed = this.keymap.get(keyPressed);
            }
            // this let's us break out with ctrl-c
            if ( key.toString() === '\u0003' ) {
                process.exit();
            }
        }.bind(this));
    }

    //is a certain key pressed?
    public isKeyPressed(key: number): boolean{
        return this.keyboard[key];  //returns key status
    }
       
    
}//techmoKeyboard