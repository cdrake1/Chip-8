"use strict";
/*
    keyboard file
    Chip-8 machines had 16 key keyboard layouts
    Techmo -- references Techmo/Samson a character from the Cartoon Network series Regular show
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.techmoKeyboard = void 0;
//import hardware
const hardware_1 = require("./hardware");
//keyboard class - child class of hardware
class techmoKeyboard extends hardware_1.hardware {
    //keyboard constructor -- creates a keyboard and initializes its variables
    constructor(id, name) {
        super(id, name);
        this.keyboard = new Uint8Array(16);
    }
}
exports.techmoKeyboard = techmoKeyboard;
//# sourceMappingURL=techmoKeyboard.js.map