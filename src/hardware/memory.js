"use strict";
/*
    memory file
    creates the Chip-8 memory and loads ROM
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.memory = void 0;
//import hardware
const hardware_1 = require("./hardware");
//memory class -- child class of hardware
class memory extends hardware_1.hardware {
    //memory constructor -- creates the memory
    constructor(id, name) {
        super(id, name); //pass memory to hardware
        this.generalMemory = new Uint8Array(4096);
    }
    //dumps the memory
    memDump() { }
}
exports.memory = memory;
//# sourceMappingURL=memory.js.map