import { ctx, CANVAS_WIDTH, CANVAS_HEIGHT } from "../../functions/index.js";
import Sprite from "../Sprite.js";
import SpriteState from "../SpriteState.js";

export default class Player extends Sprite {
    constructor(
        name,
        gameState,
        x,
        y,
        width,
        height,
        hitboxOffsetX,
        speedX,
        speedY,
        jumpSpeed,
        gravityEnvironment,
        collisionDetector,
        globalJump
    ) {
        super(name, gameState, x, y, width, height, hitboxOffsetX);

        this._speedX = speedX;
        this._speedY = speedY;
        this._jumpSpeed = jumpSpeed;

        // Collision status
        this._movingLeft;
        this._movingRight;
        this._isJumping = false;
        this._isFreeFalling = false;
        this._isOnGround = false;
        this._glued = false;
        this._gluedObj;

        this._globalJump = globalJump;
        globalJump.addEntity(this);
        gravityEnvironment.addEntity(this);
        collisionDetector.player = this;
    }

    _updateMovementX() {
        if (this._movingLeft && !this._touchingLeftWall) {
            this._x -= this._speedX;
        }
        if (this._movingRight && !this._touchingRightWall) {
            this._x += this._speedX;
        }
    }

    _updateMovementY() {
        this._y -= this._speedY;

        if (this._glued) {
            this._y = this._gluedObj.y - this._height + this._gluedObj.delta;
            return;
        }

        if (this.speedY < 0) {
            this._isOnGround = false;
            this._isFreeFalling = true;
            this._isJumping = false;
        }
    }

    _checkLose() {
        if (this._y > CANVAS_HEIGHT) {
            alert("Game Over!");
            this._gameState.resetGame();
        }
    }

    // Public
    get legOffset() {
        return this._legOffset;
    }

    get speedX() {
        return this._y;
    }

    set speedX(value) {
        this._speedX = value;
    }

    get speedY() {
        return this._speedY;
    }

    set speedY(value) {
        this._speedY = value;
    }

    get isFreeFalling() {
        return this._isFreeFalling;
    }

    get isJumping() {
        return this._isJumping;
    }

    get isOnGround() {
        return this._isOnGround;
    }

    set isOnGround(value) {
        this._isOnGround = value;
    }

    get movingLeft() {
        return this._movingLeft;
    }

    set movingLeft(value) {
        this._movingLeft = value;
    }

    get movingRight() {
        return this._movingRight;
    }

    set movingRight(value) {
        this._movingRight = value;
    }

    async build() {
        const idleState = new SpriteState(this, {
            name: "idle",
            path: "/src/assets/images/goat-idle-128",
            animates: true,
            loops: true,
            fixedLength: false,
            stateDuration: null,
            stateControlsMvmt: false,
        });
        await idleState.build();
        this._stateMachine.addState("idle", idleState);
        this.changeState("idle");
    }

    jump() {
        this._glued = false;
        if (!this._isJumping && !this._isFreeFalling) {
            this._speedY = this._jumpSpeed;
            this._isJumping = true;
            this._globalJump.playerJumping = false;
        }
        this._isOnGround = false;
        this._updateMovementY();
    }

    fall() {
        this._isOnGround = false;
        this._glued = false;
        this._gluedObj = null;
        this._globalJump.playerJumping = true;
    }

    land(obj) {
        this._speedY = 0;
        this._isFreeFalling = false;
        this._isJumping = false;
        this._isOnGround = true;
        this._glued = true;
        this._gluedObj = obj;
        this._globalJump.playerJumping = false;

        this._y = obj.y - this._height;
    }

    reset() {
        this._x = this._initX;
        this._y = this._initY;
        this._updateHitbox();

        this._movingLeft = false;
        this._movingRight = false;

        this._speedY = 0;
        this._isJumping = false;
        this._isFreeFalling = false;
        this._isOnGround = false;
        this._glued = false;
        this._gluedObj = null;
        this._globalJump.playerJumping = false;
    }

    update() {
        super.update();
        this._updateMovementX();
        this._updateMovementY();
        this._updateHitbox();
        this._checkLose();
    }
}
