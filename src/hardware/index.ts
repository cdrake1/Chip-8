//This file will allow for function between the monitor and index.html

//import monitor
import { monitor } from "./monitor";
const name1: string = "monitor1";

//Create our monitor
let mainMonitor: monitor = new monitor(1,name1,document.getElementById('screen') as HTMLCanvasElement);

mainMonitor.test();