import { hardware } from "./hardware";
import { cpu } from "./cpu";
//Need cycle function could be here or in system
// (must keep track of elapsed time since program start and use an fps to call cpu.step())

export class clock extends hardware{
    start: number;
    private _cpu: cpu;

    constructor(id: number, name: string){
        super(id, name);
    }

    cycle(){ //calls step every second
        setInterval( () => {
            this._cpu.step();
        }, 1000)
    }
}