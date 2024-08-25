import { CANVAS_HEIGHT, ctx } from "../../functions/index.js";
import Sprite from "../Sprite.js";

const sprite = new Image();
sprite.src = "/src/assets/images/background-cliff-512.png";

const sprite2 = new Image();
sprite2.src = "/src/assets/images/background-cliff-alt-512.png";

export default class BackgroundCliff extends Sprite {
    constructor(name, gameState, x1, y1, x2, y2, width, height, globalJump) {
        super(name, gameState);
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

        this._globalJump = globalJump;
        globalJump.addEntity(this);
    }

    reset() {
        this._isJumping = false;
        this._jumpDistance;
        this._jumpFrameCount;
        this._jumpFrame = 0;
        this._globalJump.backgroundScrolling = false;
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
            this._globalJump.backgroundScrolling = false;
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
            this._globalJump.backgroundScrolling = true;
        }
    }

    render() {
        ctx.drawImage(sprite, this._x1, this._y1, this._width, this._height);
        ctx.drawImage(sprite2, this._x2, this._y2, this._width, this._height);
    }
}
