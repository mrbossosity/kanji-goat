import { ctx } from "../functions/index.js";
import Sprite from "./Sprite.js";

export default class StaticSprite extends Sprite {
    constructor(name, gameState, x, y, width, height, path) {
        super(name, gameState, x, y, width, height);
        this._path = path;
        this._image;
    }

    get name() {
        return this._name;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    async build() {
        super.build();

        this._image = new Image();
        this._image.src = this._path;
    }

    render() {
        ctx.drawImage(this._image, this._x, this._y, this._width, this._height);
    }
}
