// import { backgroundCliff } from "../entities/BackgroundCliff.js";
import { game } from "./state-management/game/Game.js";
// import { controls } from "./state-management/controls/Controls.js";
// import { player } from "../entities/Player.js";
// import { scoreText } from "../entities/ScoreText.js";
// import { backgroundSky } from "../entities/Sky.js";
// import { cliffGenerator } from "./cliff-generator.js";
// import { collisionDetector } from "./collision-detection.js";
// import { dbLoader } from "./db-loader.js";
// import gameLoop from "./game-loop.js";
// import { gravity } from "./gravity.js";
// import { globalRender } from "./animator.js";
// import { globalUpdate } from "./updater.js";

// Permanent reference to canvas and drawing context
export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext("2d");
export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;

await game.build();
game.gameloop(0);
game.changeState("title-screen");

// await controls.build();

// async function buildGame() {
//     // Set up entities
//     globalUpdate.addEntity(player);
//     globalUpdate.addEntity(cliffGenerator.cliff1);
//     globalUpdate.addEntity(cliffGenerator.cliff2);
//     globalUpdate.addEntity(backgroundCliff);
//     globalUpdate.addEntity(gravity);
//     globalUpdate.addEntity(collisionDetector);

//     globalRender.addEntity(backgroundSky);
//     globalRender.addEntity(backgroundCliff);
//     globalRender.addEntity(cliffGenerator.cliff1);
//     globalRender.addEntity(cliffGenerator.cliff2);
//     globalRender.addEntity(player);
//     globalRender.addEntity(scoreText);

//     // Load text/fonts/db
//     scoreText.loadFont();
//     dbLoader.load();
// }

// // Start the game!

// function startGame() {
//     gameLoop(0);
// }

// await buildGame();
// startGame();
