import { globalUpdate } from "./update.js";

export var objectsToCollide = [];

class CollisionDetector {
    constructor() {
        this._player;
        this._objectsToCollide = [];
    }

    // Public
    set player(entity) {
        this._player = entity;
    }

    addEntity(entity) {
        this._objectsToCollide.push(entity);
    }

    checkPlayerCollisions() {
        for (let obj of this._objectsToCollide) {
            // Ignore if player is still accelerating upwards
            if (this._player.isJumping) {
                this._player.fall();
                obj.collision = false;
                continue;
            }
            // Ignore if player is fully above object or below its surface
            if (this._player.bottom < obj.top || this._player.top > obj.top) {
                this._player.fall();
                obj.collision = false;
                continue;
            }
            // Ignore if either side of the player is beyond either side of the object
            if (
                this._player.left > obj.right ||
                this._player.right < obj.left
            ) {
                this._player.fall();
                obj.collision = false;
                continue;
            }
            // Final check: ignore if object is not accepting collisions
            if (!obj.acceptingCollisions) {
                this._player.fall();
                obj.collision = false;
                continue;
            }

            // Otherwise, register collision
            this._player.land(obj);
            obj.awardPoints();
            obj.collision = true;
            break;
        }
    }

    update() {
        this.checkPlayerCollisions();
    }
}

export const collisionDetector = new CollisionDetector();
