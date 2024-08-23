import { game } from "./state-management/game/Game.js";

// Permanent reference to canvas and drawing context
export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext("2d");
export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;

async function launchGame() {
    await game.build();
    game.gameloop(0);
    game.changeState("title-screen");
}

window.addEventListener("load", (event) => {
    console.log("Window loaded! Launching game...");
    launchGame();
});
