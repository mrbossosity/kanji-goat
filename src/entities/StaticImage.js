import { ctx } from "../functions/index.js";

export default class StaticImage {
    constructor(name, gameState, x, y, width, height, path) {
        this._name = name;
        this._gameState = gameState;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._path = path;

        this._sprite;
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
        this._sprite = new Image();
        this._sprite.src = this._path;
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
