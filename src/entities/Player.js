import { collisionDetector } from "../functions/collision-detection.js";
import { globalJump } from "../functions/global-jump.js";
import { gravity } from "../functions/gravity.js";
import { ctx, CANVAS_WIDTH, CANVAS_HEIGHT } from "../functions/index.js";
import { globalUpdate } from "../functions/update.js";

// Load sprite image
const sprite = new Image();
sprite.src = "/src/assets/images/goat-128.png";

const altSprite = new Image();
altSprite.src = "/src/assets/images/goat-alt-128.png";

class Player {
    constructor(x, y, width, height, speedX, speedY, jumpSpeed) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._speedX = speedX;
        this._speedY = speedY;
        this._jumpSpeed = jumpSpeed;

        // Hitbox markers
        this._legOffset = 40;
        this._left = this._x + this._legOffset;
        this._right = this._x + this._width - this._legOffset;
        this._top = this._y;
        this._bottom = this._y + this._height;

        // Collision status
        // this._onGround = true;
        this._movingLeft;
        this._movingRight;
        this._isJumping = false;
        this._isFreeFalling = false;
        this._isOnGround = false; // New flag to track whether the player is on the ground
        // this._touchingLeftWall = false;
        // this._touchingRightWall = false;
        // this._touchingBottomWall = false;

        this._frame = 0; // for alternating sprites

        // globalUpdate.addEntity(this);
        globalJump.addEntity(this);
        gravity.addEntity(this);
        collisionDetector.player = this;
    }

    // Private
    // _checkWalls() {
    //     this._touchingLeftWall = this._x == 0 ? true : false;
    //     this._touchingRightWall = this._x == 512 - this._width ? true : false;
    // }

    _updateHitbox() {
        this._left = this._x + this._legOffset;
        this._right = this._x + this._width - this._legOffset;
        this._top = this._y;
        this._bottom = this._y + this._height;
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
        if (this.speedY < 0) {
            this._isOnGround = false;
            this._isFreeFalling = true;
            this._isJumping = false;
        }

        // if (this._speedY > 0) {
        //     this._movingUp = true;
        //     this._movingDown = false;
        // } else if (this._speedY < 0) {
        //     this._movingUp = false;
        //     this._movingDown = true;
        // } else {
        //     this._movingUp = false;
        //     this._movingDown = false;
        // }
    }

    _checkLose() {
        if (this._y > CANVAS_HEIGHT) {
            alert("you lose!");
            this.reset();
        }
    }

    // Public
    get legOffset() {
        return this._legOffset;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get speedX() {
        return this._y;
    }

    set speedX(value) {
        this._speedX = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get speedY() {
        return this._speedY;
    }

    set speedY(value) {
        this._speedY = value;
    }

    get left() {
        return this._left;
    }

    get right() {
        return this._right;
    }

    get top() {
        return this._top;
    }

    get bottom() {
        return this._bottom;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
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

    // get movingUp() {
    //     return this._movingUp;
    // }

    // get movingDown() {
    //     return this._movingDown;
    // }

    jump() {
        console.log("jump");
        if (!this._isJumping && !this._isFreeFalling) {
            this._speedY = this._jumpSpeed;
            this._isJumping = true;
        }
        this._isOnGround = false;
        this._updateMovementY();
    }

    land(y) {
        console.log("landing");

        this._speedY = 0;
        this._isFreeFalling = false;
        this._isJumping = false;
        this._isOnGround = true;

        this._y = y - this._height;
        // this_._y = y - this._height;
        // this._movingDown = false;
        // this._movingUp = false;
    }

    // freefall() {
    //     this._onGround = false;
    // }

    reset() {
        this._x = initX;
        this._y = initY;
        this._speedY = 0;
        this._movingLeft = false;
        this._movingRight = false;
    }

    update() {
        this._frame++;
        this._updateHitbox();
        this._updateMovementX();
        this._updateMovementY();

        this._checkLose();
    }

    render() {
        if (this._frame < 30) {
            ctx.drawImage(sprite, this._x, this._y, this._width, this._height);
        } else if (this._frame < 60) {
            ctx.drawImage(
                altSprite,
                this._x,
                this._y,
                this._width,
                this._height
            );
        } else {
            ctx.drawImage(
                altSprite,
                this._x,
                this._y,
                this._width,
                this._height
            );
            this._frame = 0;
        }
    }
}

// Singleton object (only one player)
const initX = 192;
const initY = 321;
export const player = new Player(initX, initY, 128, 128, 8, 0, 26);
