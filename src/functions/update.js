import { player } from "../entities/Player.js";
import { gravity } from "./gravity.js";

export function update() {
    gravity.update();
    player.update();
}
