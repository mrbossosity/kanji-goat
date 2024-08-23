import { CliffPlatform } from "../entities/main-screen/CliffPlatform.js";

export default class CliffGenerator {
    constructor(width, height, gap, scoreText, collisionDetector, globalJump) {
        this._width = width;
        this._height = height;
        this._gap = gap;
        this._cliff1 = new CliffPlatform(
            128 + width / 2,
            512 - height,
            width,
            height,
            gap,
            scoreText,
            collisionDetector,
            globalJump,
            true
        );

        let randomX = Math.floor(Math.random() * (512 - width + 1));
        this._cliff2 = new CliffPlatform(
            randomX,
            512 - height - gap,
            width,
            height,
            gap,
            scoreText,
            collisionDetector,
            globalJump,
            false
        );
    }

    // Public
    get cliff1() {
        return this._cliff1;
    }

    get cliff2() {
        return this._cliff2;
    }

    reset() {
        this._cliff1.init(this._width, this._height);
        this._cliff2.initAlt(this._width, this._height, this._gap);
    }
}
