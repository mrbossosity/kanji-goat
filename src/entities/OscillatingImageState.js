import SpriteState from "./SpriteState.js";

export default class OscillatingImageState extends SpriteState {
    constructor(sprite, stateInfo, amplitude, period) {
        super(sprite, stateInfo);
        this._frame = 0;
        this._amplitude = amplitude; // px
        this._period = period; // frames @120fps
        this._deltaY = this._amplitude / this._period / 2;
    }

    update() {
        super.update();
        if (this._frame == this._period) {
            this._frame = 0;
        }

        if (
            this._frame < this._period / 4 ||
            (this._frame >= this._period / 2 &&
                this._frame < (this._period / 4) * 3)
        ) {
            this._y += this._deltaY;
        } else if (
            (this._frame >= this._period / 4 &&
                this._frame < this._period / 2) ||
            (this._frame >= (this._period / 4) * 3 &&
                this._frame < this._period)
        ) {
            this._y -= this._deltaY;
        }

        this._frame++;
    }
}
