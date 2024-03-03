//This file will allow for function between the monitor and index.html

//import monitor
import { monitor } from "../src/hardware/monitor";

//create our monitor
const _monitor = new monitor(0,"Monitor");

_monitor.paintCanvas();