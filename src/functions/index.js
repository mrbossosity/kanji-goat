import { backgroundCliff } from "../entities/BackgroundCliff.js";
import { player } from "../entities/Player.js";
import { backgroundSky } from "../entities/Sky.js";
import { cliffGenerator } from "./cliff-generator.js";
import { collisionDetector } from "./collision-detection.js";
import gameLoop from "./game-loop.js";
import { gravity } from "./gravity.js";
import { globalRender } from "./render.js";
import { globalUpdate } from "./update.js";

// Permanent reference to canvas and drawing context
export const canvas = document.getElementById("game-canvas");
export const ctx = canvas.getContext("2d");
export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;

// Set up entities
globalUpdate.addEntity(player);
globalUpdate.addEntity(cliffGenerator.cliff1);
globalUpdate.addEntity(cliffGenerator.cliff2);
globalUpdate.addEntity(backgroundCliff);
globalUpdate.addEntity(gravity);
globalUpdate.addEntity(collisionDetector);

globalRender.addEntity(backgroundSky);
globalRender.addEntity(backgroundCliff);
globalRender.addEntity(cliffGenerator.cliff1);
globalRender.addEntity(cliffGenerator.cliff2);
globalRender.addEntity(player);

// Start the game!
gameLoop(0);
