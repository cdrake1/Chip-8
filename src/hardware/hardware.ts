import { mem } from "./mem";

export class hardware { //parent class

    idNum: number;
    name: string;
    debug: boolean;

    constructor (id: number, name: string){ //parent constructor
        this.idNum = id;
        this.name = name;
        this.debug = true; //set default true
    }

    public memDebug = true; //debug flags for clock, memory, and cpu
    public cpuDebug = true;
    public clockDebug = true; 

    public log (message: string){ //prints creation of hardware if debug true
        if(this.debug){
            let time = new Date().getMilliseconds();
            console.log("[HW - " + this.name + " id: " + this.idNum + " - " + time +"]: " + message);
        }
    }
}