import { canvas, ctx } from "./index.js";

export var objectsToRender = [];

export default function render() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Sky first, then clouds, then cliff, then player, etc.
    for (let obj of objectsToRender) {
        obj.render();
    }
}
