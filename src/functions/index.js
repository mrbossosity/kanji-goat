import Game from "/src/functions/state-management/game/Game.js";

// Global references
export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext("2d");
export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;
export const GLOBAL_FPS = 60;
export const GLOBAL_MS = Math.round(1000 / GLOBAL_FPS);

async function launchGame() {
    const game = new Game(GLOBAL_FPS, GLOBAL_MS);
    await game.build();
    console.log("Game ready");

    game.gameloop(0);
    game.changeState("title-screen");

    window.setTimeout(() => {
        document.getElementById("answer-input").focus();
    }, 0);
}

window.addEventListener("load", (e) => {
    console.log("Window loaded! Launching game...");
    launchGame();
});
