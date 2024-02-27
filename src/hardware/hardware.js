"use strict";
/*
    Hardware file
    Used to create hardware for Chip-8
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.hardware = void 0;
//hardware class -- parent class
class hardware {
    //hardware constructor -- builds different instances of the interpreters hardware
    constructor(id, name) {
        this.idNum = id;
        this.name = name;
        this.debug = true; //set default true
    }
    //log function --  outputs creation of hardware
    log(message) {
        //check if the debug flag is set
        if (this.debug) {
            let time = new Date().getMilliseconds();
            console.log("[HW - " + this.name + " id: " + this.idNum + " - " + time + "]: " + message);
        }
    }
}
exports.hardware = hardware;
//# sourceMappingURL=hardware.js.map