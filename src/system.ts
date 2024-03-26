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

 
        this._keyboard = new techmoKeyboard(0, "Keyboard");
        this._monitor = new monitor(0, "Monitor", documentMock);
        this._speaker = new speaker(0, "Speaker");
        this._cpu = new cpu(0, "CPU", this._monitor, this._keyboard, this._speaker, this._mem);
        this._clock = new clock(0, "Clock", this._cpu);
        this.running  = false;
        this.loadMem("roms/logo.ch8");
        console.log("System.ts Constructor Completed");
    }

    // Example method to demonstrate usage
    public async loadMem(filePath: string): Promise<void> {
        // Load ROM asynchronously
        await this._mem.ROMBuffer(filePath);
    
        // Wait until ROM is loaded
        await this._mem.waitForROM();
    
        // ROM is loaded, start the system
        console.log("ROM Loaded. Starting system...");
        this.startSystem();
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
