import { monitor } from "./monitor";

// Create a monitor instance
const _monitor = new monitor(0, "Monitor", document);

// Ensure the document is loaded before calling paintCanvas()
document.addEventListener("DOMContentLoaded", () => {
    // Call paintCanvas() after the document is loaded
    _monitor.paintCanvas();
});