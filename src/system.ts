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

//system class -- child class of hardware
export class System extends hardware {
    private _cpu : cpu; //create cpu
    private _mem : memory; //create memory
    private _keyboard : techmoKeyboard; //creates keyboard
    private _monitor : monitor;
    public running: boolean; //is the system on?

    //system constructor -- creates the system and instances of hardware(cpu, mem)
    constructor(id: number, name: string) {
        super(id, name); //pass system to hardware constructor
        this._mem = new memory(0, "RAM"); //create new memory hardware
        this._keyboard = new techmoKeyboard(0, "Keyboard"); //creates new keyboard hardware
        this._monitor = new monitor(0,"Monitor");
        this._cpu = new cpu(0, "CPU", this._monitor, this._keyboard); //create new cpu hardware
        this.running  = false;
        this.startSystem(); //start the system(press the power button)
    }

    //turn the system on and output what hardware was created
    public startSystem(): boolean {
        this.log("created");
        this._cpu.log("created");
        this._mem.log("created");
        this._monitor.log("created");
        this._keyboard.log("Elevate Keyboard");
        this._mem.ROMBuffer("roms/SPACE_INVADERS");
        return true;
    }

    //turns the system off
    public stopSystem(): boolean {
        return false;
    }
}
let system: System = new System(0, "System"); //create an instance of system