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

    //setter function for debug
    public setDebug(debugFlag: boolean){
        this.debug = debugFlag;
    }

    //outputs hex properly
    public hexlog(theNum: number, desiredLength: number, memAddress: number){
        let hexNum = theNum.toString(16).toUpperCase(); //hex nums are 16 digits long

        //output error message
        if(theNum > 0xFF){
            console.log("Address : 10000 Contains Value: ERR [hexValue conversion]: number undefined");
        }
        else{
            if(hexNum.length == 1){ //pads data in memory
                hexNum = '0x' + '0' + hexNum;
            }
            else{
                hexNum = '0x' + hexNum;
            }
        }
        let memHex = memAddress.toString(16).toUpperCase(); //creates and pads memory address location
        if(memHex.length == 1){
            memHex = '0x000' + memAddress.toString(16).toUpperCase();
        }
        else{
            memHex = '0x00' + memAddress.toString(16).toUpperCase();
        }
        
        this.log("Memory Address " + memHex + " contains data " + hexNum);
    }
}