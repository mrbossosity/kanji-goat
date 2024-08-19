import { backgroundCliff } from "../entities/BackgroundCliff.js";
import { player } from "../entities/Player.js";
import { cliffGenerator } from "./cliff-generator.js";
import { globalJump } from "./global-jump.js";

export default function resetGame() {
    player.reset();
    cliffGenerator.reset();
    backgroundCliff.reset();
    globalJump.isJumping = false;
}
