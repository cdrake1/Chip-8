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
    display: number[][];
    canvas: HTMLCanvasElement; //to be used in index.html
    canvasCtx: CanvasRenderingContext2D; // Define canvasCtx to hold the 2D context

    //constructor
    constructor(id: number, name: string, canvas: HTMLCanvasElement) {
        super(id, name); //passes monitor to hardware

        // CHIP-8 has a 64x32 pixel display
        this.cols = 64;
        this.rows = 32;
        this.scale = 15; // Scale up the pixel size 15x

        // create the 2D array to be filled with pixels
        this.display = [];
         for (let i = 0; i < this.cols; i++) {
             this.display[i] = [];
             for (let j = 0; j < this.rows; j++) {
                 this.display[i][j] = 0;
             }
         }

        // create canvas for html with the correct size and scale
        this.canvas = canvas;
        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.rows * this.scale;

        // creates an object with methods that allows for drawing on the canvas above
        this.canvasCtx = this.canvas.getContext('2d');
    }//constructor

    //Identifies the pixel at x,y and toggles it, returning the result of the toggle
    setPixel(x: number, y: number): boolean {
        // Check if the input is wrapped around
        x = (x + this.cols) % this.cols;
        y = (y + this.rows) % this.rows;

        // toggle the value at the location
        this.display[x][y] ^= 1;

        // returns true if pixel has been turned off, false if turned on
        return this.display[x][y] === 0;
    }//setPixel

    // Clears the display
    clear(): void {
        // Reset all elements of the display array to 0
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.display[i][j] = 0;
            }
        }
    }//clear

    // Paint the canvas
    paintCanvas() {
        // Clear canvas and make it all black
        this.canvasCtx.fillStyle = '#FFF';
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // loop through array and update screen
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (this.display[x][y] === 1) {
                    let pixelX = x * this.scale;
                    let pixelY = y * this.scale;
                    // Determine if the pixel is on, and then represent that by making it white
                    this.canvasCtx.fillStyle = '#FFF';
                    this.canvasCtx.fillRect(pixelX, pixelY, this.scale, this.scale);
                }
            }
        }
    }//paintCanvas

    test() {
        this.paintCanvas();
        this.setPixel(0, 0);
        this.setPixel(5, 2);
        
    }
}//monitor