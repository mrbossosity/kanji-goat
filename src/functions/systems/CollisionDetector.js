export default class CollisionDetector {
    constructor(gameState) {
        this._gameState = gameState;
        this._player;
        this._carrot;
        this._objectsToCollide = [];
    }

    // Private
    _handleMiss(obj) {
        obj.collision = false;
        if (this._player.gluedObj == obj) {
            this._player.glued = false;
            this._player.gluedObj = null;
        }
    }

    _handleCollision(obj) {
        if (obj == this._player.gluedObj) return;
        if (obj.name == "Carrot") {
            obj.carrotCollision();
            this._gameState.scoreText.addPoints(100);
        } else {
            this._player.land(obj);
            obj.registerLanding();
        }
    }

    // Public
    set player(entity) {
        this._player = entity;
    }

    set carrot(carrot) {
        this._carrot = carrot;
    }

    addEntity(entity) {
        this._objectsToCollide.push(entity);
    }

    checkPlayerCollisions() {
        for (let obj of this._objectsToCollide) {
            // Ignore if object is not accepting collisions
            if (!obj.acceptingCollisions) {
                this._handleMiss(obj);
                continue;
            }

            // Ignore if player is still accelerating upwards
            if (this._player.isJumping) {
                this._handleMiss(obj);
                continue;
            }

            // Ignore if either side of the player is beyond either side of the object
            if (
                this._player.left > obj.right ||
                this._player.right < obj.left
            ) {
                this._handleMiss(obj);
                continue;
            }

            // If player's bottom is between the object's top and bottom, register collision
            if (
                this._player.bottom >= obj.top &&
                this._player.bottom <= obj.bottom + this._player.speedY
            ) {
                this._handleCollision(obj);
            }
        }
    }

    update() {
        this.checkPlayerCollisions();
    }
}
