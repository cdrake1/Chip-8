"use strict";
//This file will allow for function between the monitor and index.html
Object.defineProperty(exports, "__esModule", { value: true });
//import monitor
const monitor_1 = require("./monitor");
const name1 = "monitor1";
//Create our monitor
let mainMonitor = new monitor_1.monitor(1, name1, document.getElementById('screen'));
mainMonitor.test();
//# sourceMappingURL=index.js.map