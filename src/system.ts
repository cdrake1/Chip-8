/*
    System file
    Used to turn the system on and off
    Also creates instances of hardware
*/

//import hardware, cpu, and memory
import { cpu } from "./hardware/cpu";
import { hardware } from "./hardware/hardware";
import { memory } from "./hardware/memory";

//system class -- child class of hardware
export class System extends hardware {
    private _cpu : cpu; //create cpu
    private _mem : memory; //create cpu
    public running: boolean; //is the system on?

    //system constructor -- creates the system and instances of hardware(cpu, mem)
    constructor(id: number, name: string) {
        super(id, name); //pass system to hardware constructor
        this._cpu = new cpu(0, "CPU"); //create new cpu hardware
        this._mem = new memory(0, "RAM"); //create new memory hardware
        this.running  = false;
        this.startSystem(); //start the system(press the power button)
    }

    //turn the system on
    public startSystem(): boolean {
        this.log("created");
        this._cpu.log("created");
        return true;
    }

    //turns the system off
    public stopSystem(): boolean {
        return false;
    }
}
let system: System = new System(0, "System"); //create an instance of system