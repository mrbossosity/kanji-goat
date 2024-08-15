import gameLoop from "./game-loop.js";

// Permanent reference to canvas and drawing context
export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext("2d");

// Start the game!
gameLoop();
