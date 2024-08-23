import SpriteState from "../SpriteState.js";
import TextSprite from "../TextSprite.js";

export default class TitleText extends TextSprite {
    constructor(
        name,
        gameState,
        x,
        y,
        text,
        fontName,
        fontURL,
        fontSize,
        textAlign,
        color,
        subColor,
        subColorOffsetX,
        subColorOffsetY
    ) {
        super(
            name,
            gameState,
            x,
            y,
            text,
            fontName,
            fontURL,
            fontSize,
            textAlign,
            color,
            subColor,
            subColorOffsetX,
            subColorOffsetY
        );
    }

    async build() {
        super.build();
        const oscillatingTextState = new OscillatingTextState(this, 40, 180);
        this._stateMachine.addState("oscillating", oscillatingTextState);
        this._stateMachine.changeState("oscillating");
    }
}

class OscillatingTextState extends SpriteState {
    constructor(sprite, amplitude, period) {
        super(sprite);
        this._frame = 0;
        this._amplitude = amplitude; // px
        this._period = period; // frames @120fps
        this._deltaY = this._amplitude / this._period / 2;
        console.log(this._deltaY);
    }

    enter() {
        super.enter();
    }

    update() {
        if (this._frame == this._period) {
            this._frame = 0;
        }

        if (
            this._frame < this._period / 4 ||
            (this._frame >= this._period / 2 &&
                this._frame < (this._period / 4) * 3)
        ) {
            this._sprite.y += this._deltaY;
        } else if (
            (this._frame >= this._period / 4 &&
                this._frame < this._period / 2) ||
            (this._frame >= (this._period / 4) * 3 &&
                this._frame < this._period)
        ) {
            this._sprite.y -= this._deltaY;
        }

        this._frame++;
    }

    exit() {
        super.exit();
    }
}
