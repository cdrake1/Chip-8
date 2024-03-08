import { hardware } from "./hardware";
import { cpu } from "./cpu";

//Clock class -- child class of hardware
export class clock extends hardware{
    private _cpu: cpu;

    //Clock constructor -- initializes the variables
    constructor(id: number, name: string, cpu: cpu){
        super(id, name);
        this._cpu = cpu;
    }

    cycle(){ //calls step every second
        setInterval( () => {
            this._cpu.step();
        }, 1000/60)
    }
}