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
            if (!entity.isOnGround) entity.speedY -= this._force;
        }
    }
}

export const gravity = new Gravity(1.5);
