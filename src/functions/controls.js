import { player } from "../entities/Player.js";
import { globalJump } from "./global-jump.js";

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        player.movingLeft = true;
    } else if (e.key === "ArrowRight") {
        player.movingRight = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") {
        player.movingLeft = false;
    } else if (e.key === "ArrowRight") {
        player.movingRight = false;
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        globalJump.jump(384, 35);
    }
});
