import { ctx } from "../functions/index.js";
import StatefulBase from "../functions/state-management/StatefulBase.js";

export default class Sprite extends StatefulBase {
    constructor(gameState, x, y, width, height) {
        super();
        this._gameState = gameState;
        this._x = x;
        this._y = y;
        // this._initX = x;
        // this._initY = y;
        this._width = width;
        this._height = height;

        this._sprite;
    }

    async build() {}

    update() {
        super.update();
    }

    render() {
        ctx.drawImage(
            this._sprite,
            this._x,
            this._y,
            this._width,
            this._height
        );
    }
}
