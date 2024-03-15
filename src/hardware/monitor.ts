import { hardware } from "./hardware";

export class monitor extends hardware {
    cols: number;
    rows: number;
    scale: number;
    display: number[][];
    canvas: HTMLCanvasElement;
    canvasCtx: CanvasRenderingContext2D;

    constructor(id: number, name: string, document: Document) {
        super(id, name);
        this.cols = 64;
        this.rows = 32;
        this.scale = 15;

        this.display = [];
        for (let i = 0; i < this.cols; i++) {
            this.display[i] = [];
            for (let j = 0; j < this.rows; j++) {
                this.display[i][j] = 0;
            }
        }

        // Create canvas element using document object passed from outside
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.rows * this.scale;

        // Get 2D rendering context
        this.canvasCtx = this.canvas.getContext('2d');
    }

    setPixel(x: number, y: number): boolean {
        x = (x + this.cols) % this.cols;
        y = (y + this.rows) % this.rows;

        this.display[x][y] ^= 1;

        return this.display[x][y] === 0;
    }

    clear(): void {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.display[i][j] = 0;
            }
        }
    }

    paintCanvas(): void {
        this.canvasCtx.fillStyle = '#FFF';
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (this.display[x][y] === 1) {
                    const pixelX = x * this.scale;
                    const pixelY = y * this.scale;
                    this.canvasCtx.fillStyle = '#FFF';
                    this.canvasCtx.fillRect(pixelX, pixelY, this.scale, this.scale);
                }
            }
        }
    }

    test(): void {
        this.paintCanvas();
        this.setPixel(0, 0);
        this.setPixel(5, 2);
    }
}