export default class CollisionDetector {
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
            if (!obj.acceptingCollisions && obj.name !== "Carrot") {
                this._player.fall();
                obj.collision = false;
                continue;
            }

            // If player's bottom is between the object's top and bottom, register collision
            if (
                this._player.bottom >= obj.top &&
                this._player.bottom <= obj.bottom + this._player.speedY
            ) {
                if (obj.name == "Carrot") {
                    console.log("null carrot");
                    obj.changeState("null");
                } else {
                    this._player.land(obj);
                    obj.registerLanding();
                    obj.collision = true;
                    break;
                }
            }
        }
    }

    update() {
        this.checkPlayerCollisions();
    }
}
