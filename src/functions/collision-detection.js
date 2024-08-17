import { globalUpdate } from "./update.js";

export var objectsToCollide = [];

class CollisionDetector {
    constructor() {
        this._objectsToCollide = [];
        this._player;

        // globalUpdate.addEntity(this);
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
            // Do not detect if player is still accelerating upwards
            if (this._player.isJumping) {
                this._player.fall();
                continue;
            }
            if (this._player.bottom < obj.top || this._player.top > obj.top) {
                this._player.fall();
                continue;
            }

            if (
                this._player.left <= obj.right &&
                this._player.right >= obj.left
            ) {
                this._player.land(obj);
                break;
            }

            this._player.fall();
        }
    }

    update() {
        this.checkPlayerCollisions();
    }
}

export const collisionDetector = new CollisionDetector();
