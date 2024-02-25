/*
    Hardware file
    Used to create hardware for Chip-8
*/

//hardware class -- parent class
export class hardware {
    idNum: number;  //id numbers associated with hardware
    name: string;   //name of the hardware
    debug: boolean; //flag for debugging

    //hardware constructor -- builds different instances of the interpreters hardware
    constructor (id: number, name: string){
        this.idNum = id;
        this.name = name;
        this.debug = true; //set default true
    }

    //log function --  outputs creation of hardware
    public log (message: string){

        //check if the debug flag is set
        if(this.debug){
            let time = new Date().getMilliseconds();
            console.log("[HW - " + this.name + " id: " + this.idNum + " - " + time +"]: " + message);
        }
    }
}