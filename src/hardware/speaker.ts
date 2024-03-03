import { hardware } from "./hardware";

//speaker class -- child class of hardware
export class speaker extends hardware{

    //speaker constructor -- creates the components and variables for the speaker
    constructor(id: number, name: string){
        super(id, name);
        /*
            not sure what is needed yet...
        */
    }

    public play(){}
    public stop(){}
}