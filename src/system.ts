/*
    System file
    Used to turn the system on and off
    Also creates instances of hardware
*/

//import hardware, cpu, and memory
import { cpu } from "./hardware/cpu";
import { hardware } from "./hardware/hardware";
import { memory } from "./hardware/memory";
import { techmoKeyboard } from "./hardware/techmoKeyboard";
import { monitor } from "./hardware/monitor";
import { speaker } from "./hardware/speaker";
import { clock } from "./hardware/clock";

//system class -- child class of hardware
export class System extends hardware {
    private _cpu : cpu; //create cpu
    private _clock : clock; //creates clock
    private _mem : memory; //create memory
    private _keyboard : techmoKeyboard; //creates keyboard
    private _monitor : monitor;
    private _speaker : speaker;
    public running: boolean; //is the system on?
    

    //system constructor -- creates the system and instances of hardware(cpu, mem)
    constructor(id: number, name: string, path: string) {
        super(id, name); //pass system to hardware constructor
        this._mem = new memory(0, "RAM"); //create new memory hardware

        console.log(path);
        
        //CURRENT ISSUE EXISTS HERE!
        this._mem.ROMBuffer(path);


        this._keyboard = new techmoKeyboard(0, "Keyboard"); //creates new keyboard hardware
        this._monitor = new monitor(0,"Monitor"); //creates new monitor hardware
        this._speaker = new speaker(0, "Speaker"); //creates new speaker hardware
        this._cpu = new cpu(0, "CPU", this._monitor, this._keyboard,this._speaker, this._mem); //create new cpu hardware
        this._clock = new clock(0, "Clock", this._cpu); //creates new clock hardware
        this.running  = false;
        this.startSystem(); //start the system(press the power button)
        console.log("System.ts Constructor Completed");
    }

    //turn the system on and output what hardware was created
    public startSystem(): boolean {
        this.log("created");
        this._cpu.log("created");
        this._mem.log("created");
        this._monitor.log("created");
        this._keyboard.log("Elevate Keyboard");
        this._clock.log("created");
        this._clock.cycle();
        return true;
    }

    //turns the system off
    public stopSystem(): boolean {
        return false;
    }
}