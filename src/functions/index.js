import Game from "/src/functions/state-management/game/Game.js";

// Global references
export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext("2d");
export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;
export const GLOBAL_FPS = 120;

async function launchGame() {
    const game = new Game(GLOBAL_FPS);
    await game.build();
    console.log("Game ready");

    game.gameloop(0);
    game.changeState("title-screen");
}

window.addEventListener("load", (e) => {
    console.log("Window loaded! Launching game...");
    launchGame();
});
