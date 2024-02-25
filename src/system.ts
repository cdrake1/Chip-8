// import statements for hardware and CPU
import {cpu} from "./hardware/cpu";
import { hardware } from "./hardware/hardware";
import {mem} from "./hardware/mem";

export class System extends hardware { //child class of hardware
   
    private _cpu : cpu = null;
    private _mem : mem = null;
    public running: boolean = false;

    constructor(id: number, name: string) { //create hardware for cpu and system
        super(id, name); //pass system to hardware constructor

        this._cpu = new cpu(0, "CPU"); //create new cpu hardware
        this._mem = new mem(0, "RAM"); //create new memory hardware


        /*
        Start the system (Analogous to pressing the power button and having voltages flow through the components)
        When power is applied to the system clock, it begins sending pulses to all clock observing hardware
        components so they can act on each clock cycle.
         */
        this.startSystem(); //start the system
    }

    public startSystem(): boolean { //log both system and cpu as created
        this.log("created");
        this._cpu.log("created");
        //this._mem.log("created - Addressable space : " + this._mem.addressableSpace()); //created is message passed
       
        return true;
    }

    public stopSystem(): boolean { //turns of the system
        return false;
    }
}

let system: System = new System(0, "System"); //create new version of system