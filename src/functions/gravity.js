import { globalUpdate } from "./update.js";

class Gravity {
    constructor(force) {
        this._floatingEntities = [];
        this._force = force;

        // globalUpdate.addEntity(this);
    }

    // Public
    get floatingEntities() {
        return this._floatingEntities;
    }

    set floatingEntities(value) {
        this._floatingEntities = value;
    }

    addEntity(entity) {
        this._floatingEntities.push(entity);
    }

    update() {
        for (let entity of this._floatingEntities) {
            if (!entity.isOnGround)
                // if (entity.movingUp || entity.movingDown) {
                // console.log("update gravity");
                entity.speedY -= this._force;
            // }
            // else entity.speedY = 0;
        }
    }
}

export const gravity = new Gravity(2);
