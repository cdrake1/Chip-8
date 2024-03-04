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

    //Functions needed - one to start sound and one to stop the sound)
    public play(){}
    public stop(){}
}