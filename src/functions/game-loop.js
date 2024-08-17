import render from "./render.js";
import { globalUpdate } from "./update.js";

const fps = 60;
var lastTime = 0;
var interval = 1000 / fps;
export default function gameLoop(timestamp) {
    // calculate the time elapsed since the last frame
    let timeElapsed = timestamp - lastTime;

    // if the time elapsed is greater than or equal to the interval, update the game state and render
    if (timeElapsed >= interval) {
        lastTime = timestamp;
        globalUpdate.update();
        render();
    }

    // Get next frame
    requestAnimationFrame(gameLoop);
}
