import { hardware } from "./hardware";

export class mem extends hardware{

    constructor(id: number, name: string){
        super(id, name);
    }
    public memDump(){}
}