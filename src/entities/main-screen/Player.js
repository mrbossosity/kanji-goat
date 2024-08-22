import { ctx, CANVAS_WIDTH, CANVAS_HEIGHT } from "../../functions/index.js";
// import resetGame from "../../functions/reset-game.js";

// Load sprite image
const sprite = new Image();
sprite.src = "/src/assets/images/goat-128.png";

const altSprite = new Image();
altSprite.src = "/src/assets/images/goat-alt-128.png";

export default class Player {
    constructor(
        gameState,
        x,
        y,
        width,
        height,
        speedX,
        speedY,
        jumpSpeed,
        gravityEnvironment,
        collisionDetector,
        globalJump
    ) {
        this._gameState = gameState;
        this._x = x;
        this._initX = x;
        this._y = y;
        this._initY = y;
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
        this._movingLeft;
        this._movingRight;
        this._isJumping = false;
        this._isFreeFalling = false;
        this._isOnGround = false;
        this._glued = false;
        this._gluedObj;

        this._frame = 0; // for alternating sprites

        globalJump.addEntity(this);
        gravityEnvironment.addEntity(this);
        collisionDetector.player = this;
    }

    // Private
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
            alert("you lose!");
            this._gameState.resetGame();
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

    jump() {
        this._glued = false;
        if (!this._isJumping && !this._isFreeFalling) {
            this._speedY = this._jumpSpeed;
            this._isJumping = true;
        }
        this._isOnGround = false;
        this._updateMovementY();
    }

    fall() {
        this._isOnGround = false;
        this._glued = false;
        this._gluedObj = null;
    }

    land(obj) {
        this._speedY = 0;
        this._isFreeFalling = false;
        this._isJumping = false;
        this._isOnGround = true;
        this._glued = true;
        this._gluedObj = obj;

        this._y = obj.y - this._height;
    }

    reset() {
        this._x = this._initX;
        this._y = this._initY;

        this._movingLeft = false;
        this._movingRight = false;

        this._speedY = 0;
        this._isJumping = false;
        this._isFreeFalling = false;
        this._isOnGround = false;
        this._glued = false;
        this._gluedObj = null;
    }

    update() {
        this._frame++;
        this._updateMovementX();
        this._updateMovementY();
        this._updateHitbox();
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
