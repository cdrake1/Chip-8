import { cpu } from "./hardware/cpu";
import { hardware } from "./hardware/hardware";
import { memory } from "./hardware/memory";
import { techmoKeyboard } from "./hardware/techmoKeyboard";
import { monitor } from "./hardware/monitor";
import { speaker } from "./hardware/speaker";
import { clock } from "./hardware/clock";
import { JSDOM } from 'jsdom';

// Mock the document object using JSDOM
const documentMock = new JSDOM().window.document;

// System class
export class System extends hardware {
    private _cpu : cpu;
    private _clock : clock;
    private _mem : memory;
    private _keyboard : techmoKeyboard;
    private _monitor : monitor;
    private _speaker : speaker;
    public running: boolean;

    // System constructor
    constructor(id: number, name: string) {
        super(id, name);
        this._mem = new memory(0, "RAM");

        // For simplicity, I assumed the ROMBuffer method exists in the memory class
        this._mem.ROMBuffer("/roms/logo.ch8");

        this._keyboard = new techmoKeyboard(0, "Keyboard");
        this._monitor = new monitor(0, "Monitor", documentMock);
        this._speaker = new speaker(0, "Speaker");
        this._cpu = new cpu(0, "CPU", this._monitor, this._keyboard, this._speaker, this._mem);
        this._clock = new clock(0, "Clock", this._cpu);
        this.running  = false;
        this.startSystem();
        console.log("System.ts Constructor Completed");
    }

    // Method to start the system
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

    // Method to stop the system
    public stopSystem(): boolean {
        return false;
    }
}

// Create an instance of System
const system: System = new System(0, "System");
