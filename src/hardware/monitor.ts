/*
    Monitor file.
    Referenced in index.html
    It will be our way of viewing the program

*/

//import hardware
import { hardware } from "./hardware";

export class monitor extends hardware {
    cols: number;
    rows: number;
    scale: number;
    display: number[];
    canvas: HTMLCanvasElement; //to be used in index.html
    canvasCtx: CanvasRenderingContext2D; // Define canvasCtx to hold the 2D context

    //constructor
    constructor(id: number, name: string,canvas: HTMLCanvasElement) {
        super(id, name);//passes monitor to hardware

        //CHIP-8 has a 64x32 pixel display
        this.cols = 64; 
        this.rows = 32;
        this.scale = 15;//Scale up the pixel size 15x

        //create the array to be filled with pixels
        this.display = new Array(this.cols * this.rows);

        //create canvas for html with the correct size and scale
        this.canvas = canvas;
        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.rows * this.scale;

        //creates an object with methods that allows for drawing on the canvas above
        this.canvasCtx = this.canvas.getContext('2d')

    }//constructor

    //Identifies the pixel at x,y and toggles it, returning the result of the toggle
    setPixel(x,y): boolean 
    {
        //Check if the input is wrapped around
        if(x > this.cols)
            x -= this.cols;
        else if(x < 0)
            x += this.cols;
        if(y > this.rows)
            y-= this.rows;
        else if(y < 0)
            y += this.rows;
        
        //calculate x offset and how many rows are skipped, toggle the value at the location
        this.display[x+ (y * this.cols)] ^= 1;
        
        //returns true if pixel has been turned off, false is turned on
        return this.display[x+ (y*this.cols)] != 1;
    }//setPixel

    //Clears the display
    clear(): void {
        this.display = new Array(this.cols * this.rows)
    }//clear

    //Paint the canvas
    paintCanvas() {
        // Clear canvas and make it all black
        this.canvasCtx.fillStyle = '#000';
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        // Loop through array and update screen
        for (let i = 0; i < this.rows * this.cols; i++) {
            let x = (i % this.cols) * this.scale; // Convert to scaled 2D array
            let y = Math.floor(i / this.cols) * this.scale; // Convert to scaled 2D array
    
            // Determine if the pixel is on, and then represent that by making it white
            if (this.display[i] === 1) {
                this.canvasCtx.fillStyle = '#FFF';
                this.canvasCtx.fillRect(x, y, this.scale, this.scale);
            }
        }
    }

    test()
    {
        this.setPixel(0,0);
        this.setPixel(5,2);
        this.paintCanvas();
    }
}//monitor