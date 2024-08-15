import { gravity } from "../functions/gravity.js";
import { ctx } from "../functions/index.js";

// Load sprite image
const sprite = new Image();
sprite.src = "/src/assets/images/goat-128.png";

const altSprite = new Image();
altSprite.src = "/src/assets/images/goat-alt-128.png";

class Player {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._width = 128;
        this._height = 128;
        this._speedX = 6;
        this._speedY = 0;
        this._moveLeft;
        this._moveRight;
        this._touchingLeftWall = false;
        this._touchingRightWall = false;
        this._touchingBottomWall = false;
        this._isFloating = false;
        this._frame = 0; // for alternating sprites

        gravity.addEntity(this);
    }

    // Private
    _checkWalls() {
        this._touchingLeftWall = this._x == 0 ? true : false;
        this._touchingRightWall = this._x == 512 - this._width ? true : false;
        if (this._isFloating) {
            this._touchingBottomWall = this._y == initY ? true : false;
        }
    }

    _updateMovementX() {
        if (this._moveLeft && !this._touchingLeftWall) {
            this._x -= this._speedX;
        }
        if (this._moveRight && !this._touchingRightWall) {
            this._x += this._speedX;
        }
    }

    _updateMovementY() {
        if (this._isFloating) {
            if (this._touchingBottomWall) {
                this._isFloating = false;
                this._speedY = 0;
            }
            this._y -= this._speedY;
        }
    }

    // Public
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

    get moveLeft() {
        return this._moveLeft;
    }

    set moveLeft(value) {
        this._moveLeft = value;
    }

    get moveRight() {
        return this._moveRight;
    }

    set moveRight(value) {
        this._moveRight = value;
    }

    get isFloating() {
        return this._isFloating;
    }

    jump() {
        if (this._isFloating) return;
        this._touchingBottomWall = false;
        this._isFloating = true;
        this._speedY = 22;
        this._updateMovementY();
    }

    update() {
        this._frame++;
        this._checkWalls();
        this._updateMovementX();
        this._updateMovementY();
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
const initY = 384;
export const player = new Player(192, 384);
