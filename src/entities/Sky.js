import { ctx } from "../functions/index.js";

const sprite = new Image();
sprite.src = "/src/assets/images/sky-512.png";

class Sky {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._width = 512;
        this._height = 512;
    }

    render() {
        ctx.drawImage(sprite, this._x, this._y, this._width, this._height);
    }
}

export const backgroundSky = new Sky(0, 0);
