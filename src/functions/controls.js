import { player } from "../entities/Player.js";

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        player.moveLeft = true;
    } else if (e.key === "ArrowRight") {
        player.moveRight = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") {
        player.moveLeft = false;
    } else if (e.key === "ArrowRight") {
        player.moveRight = false;
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        player.jump();
    }
});
