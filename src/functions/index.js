// import { backgroundCliff } from "../entities/BackgroundCliff.js";
import { backgroundCliff } from "../entities/BackgroundCliff.js";
import { CliffPlatform } from "../entities/CliffPlatform.js";
import { player } from "../entities/Player.js";
import { backgroundSky } from "../entities/Sky.js";
import { cliffGenerator } from "./cliff-generator.js";
import { collisionDetector } from "./collision-detection.js";
import gameLoop from "./game-loop.js";
import { gravity } from "./gravity.js";
import { objectsToRender } from "./render.js";
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
globalUpdate.addEntity(cliffGenerator);
globalUpdate.addEntity(gravity);
globalUpdate.addEntity(collisionDetector);

objectsToRender.push(backgroundSky);
objectsToRender.push(backgroundCliff);
objectsToRender.push(cliffGenerator.cliff1);
objectsToRender.push(cliffGenerator.cliff2);
objectsToRender.push(player);

// Start the game!
gameLoop(0);
