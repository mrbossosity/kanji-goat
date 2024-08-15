import { canvas, ctx } from "./index.js";
import { player } from "../entities/Player.js";
import { background } from "../entities/Sky.js";

export default function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Sky first, then clouds, then cliff, then player, etc.
    background.render();
    player.render();
}
