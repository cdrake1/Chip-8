"use strict";
/*
    System file
    Used to turn the system on and off
    Also creates instances of hardware
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
//import hardware, cpu, and memory
const cpu_1 = require("./hardware/cpu");
const hardware_1 = require("./hardware/hardware");
const memory_1 = require("./hardware/memory");
const techmoKeyboard_1 = require("./hardware/techmoKeyboard");
//system class -- child class of hardware
class System extends hardware_1.hardware {
    //system constructor -- creates the system and instances of hardware(cpu, mem)
    constructor(id, name) {
        super(id, name); //pass system to hardware constructor
        this._cpu = new cpu_1.cpu(0, "CPU"); //create new cpu hardware
        this._mem = new memory_1.memory(0, "RAM"); //create new memory hardware
        this._keyboard = new techmoKeyboard_1.techmoKeyboard(0, "Keyboard"); //creates new keyboard hardware
        this.running = false;
        this.startSystem(); //start the system(press the power button)
    }
    //turn the system on and output what hardware was created
    startSystem() {
        this.log("created");
        this._cpu.log("created");
        this._mem.log("created");
        this._keyboard.log("Elevate Keyboard");
        return true;
    }
    //turns the system off
    stopSystem() {
        return false;
    }
}
exports.System = System;
let system = new System(0, "System"); //create an instance of system
//# sourceMappingURL=system.js.map