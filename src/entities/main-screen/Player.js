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
        this._glued = false;
        this._gluedObj;

        this._globalJump = globalJump;
        globalJump.addEntity(this);
        gravityEnvironment.addEntity(this);
        collisionDetector.player = this;

        // SFX
        this._sfx = {};
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
            this._y = this._gluedObj.y - this._height;
            return;
        }

        if (this.speedY < 0) {
            this._isFreeFalling = true;
            this._isJumping = false;
        }
    }

    _checkLose() {
        if (this._y > CANVAS_HEIGHT) {
            this._gameState.gameOver();
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

    get glued() {
        return this._glued;
    }

    set glued(boolean) {
        this._glued = boolean;
    }

    get gluedObj() {
        return this._gluedObj;
    }

    set gluedObj(obj) {
        this._gluedObj = obj;
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

    get sfx() {
        return this._sfx;
    }

    async build() {
        super.build();

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

        const landSfx = new Audio("/src/assets/audio/goat-landing.wav");
        this._sfx.landSfx = landSfx;
        const jumpSfx = new Audio("/src/assets/audio/goat-jump.wav");
        this._sfx.jumpSfx = jumpSfx;
    }

    jump() {
        this._sfx.jumpSfx.play();
        this._glued = false;
        this._gluedObj = null;
        this._speedY = this._jumpSpeed;
        this._isJumping = true;
        this._globalJump.playerJumping = true;
        this._updateMovementY();
    }

    fall() {
        this._glued = false;
        this._gluedObj = null;
    }

    land(obj) {
        if (this._glued) {
            return;
        }
        this._sfx.landSfx.play();
        this._speedY = 0;
        this._isFreeFalling = false;
        this._isJumping = false;
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
