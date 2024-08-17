import { collisionDetector } from "../functions/collision-detection.js";
import { globalJump } from "../functions/global-jump.js";
import { gravity } from "../functions/gravity.js";
import { ctx } from "../functions/index.js";
import { globalUpdate } from "../functions/update.js";

// Load sprite image
const sprite = new Image();
sprite.src = "/src/assets/images/cliff-platform-128-64.png";

// const altSprite = new Image();
// altSprite.src = "/src/assets/images/goat-alt-128.png";

export class CliffPlatform {
    constructor(x, y, width, height, gap) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._gap = gap;
        this._speedY = 0;

        this._isJumping = false;
        this._jumpDistance;
        this._jumpFrameCount;
        this._jumpFrame = 0;
        this._delta = 0;

        // Hitbox markers
        this._left = this._x;
        this._right = this._x + this._width;
        this._top = this._y;
        this._bottom = this._y + this._height;

        // globalUpdate.addEntity(this);
        globalJump.addEntity(this);
        gravity.addEntity(this);
        collisionDetector.addEntity(this);
    }

    // Private
    _updateHitbox() {
        this._left = this._x;
        this._right = this._x + this._width;
        this._top = this._y;
        this._bottom = this._y + this._height;
    }

    // Public
    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get speedX() {
        return this._speedX;
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

    get height() {
        return this._height;
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

    get delta() {
        return this._delta;
    }

    jump(jumpDistance, jumpFrameCount) {
        this._isJumping = true;
        this._jumpDistance = jumpDistance;
        this._jumpFrameCount = jumpFrameCount;
        this._jumpFrame = 0;
    }

    update() {
        if (this._jumpFrame >= this._jumpFrameCount) {
            this._isJumping = false;
        }

        if (this._isJumping) {
            this._delta = this._jumpDistance / this._jumpFrameCount;
            this._y += this._delta;

            if (this._y + this._delta >= 512) {
                let randomX = Math.floor(
                    Math.random() * (512 - this._width + 1)
                );
                this._x = randomX;
                this._y = this._top - this._gap * 2 + this._delta;
            }

            this._jumpFrame++;
        }

        this._updateHitbox();
    }

    render() {
        ctx.drawImage(sprite, this._x, this._y, this._width, this._height);
    }
}
