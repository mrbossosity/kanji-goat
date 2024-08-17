import { globalJump } from "../functions/global-jump.js";
import { CANVAS_HEIGHT, ctx } from "../functions/index.js";
import { globalUpdate } from "../functions/update.js";

const sprite = new Image();
sprite.src = "/src/assets/images/background-cliff-512.png";

const sprite2 = new Image();
sprite2.src = "/src/assets/images/background-cliff-alt-512.png";

class BackgroundCliff {
    constructor(x1, y1, x2, y2, width, height) {
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
        this._width = width;
        this._height = height;

        this._isJumping = false;
        this._jumpDistance;
        this._jumpFrameCount;
        this._jumpFrame = 0;

        globalUpdate.addEntity(this);
        globalJump.addEntity(this);
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
            let delta = this._jumpDistance / this._jumpFrameCount;
            this._y1 += delta;
            this._y2 += delta;

            if (this._y1 + delta >= 512) {
                this._y1 = this._y1 - 512 * 2 + delta;
            }
            if (this._y2 + delta >= 512) {
                this._y2 = this._y2 - 512 * 2 + delta;
            }
            this._jumpFrame++;
        }
    }

    render() {
        ctx.drawImage(sprite, this._x1, this._y1, this._width, this._height);
        ctx.drawImage(sprite2, this._x2, this._y2, this._width, this._height);
    }
}

export const backgroundCliff = new BackgroundCliff(0, 0, 0, -512, 512, 512);
