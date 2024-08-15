import render from "./render.js";
import { update } from "./update.js";

export default function gameLoop() {
    // Update all entities
    update();
    // Render - clear context and redraw
    render();

    // Get next frame
    requestAnimationFrame(gameLoop);
}
