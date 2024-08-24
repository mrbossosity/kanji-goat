import { canvas } from "../../functions/index.js";
import OscillatingImageState from "../OscillatingImageState.js";
import Sprite from "../Sprite.js";

export default class PlayButton extends Sprite {
    constructor(name, gameState, x, y, width, height) {
        super(name, gameState, x, y, width, height);
    }

    async build() {
        const defaultState = new PlayButtonDefault(
            this,
            {
                name: "default",
                path: "/src/assets/images/play-button-144-96",
                animates: false,
                loops: false,
                fixedLength: false,
                stateDuration: null,
                stateControlsMvmt: true,
            },
            40,
            180
        );
        await defaultState.build();
        this._stateMachine.addState(defaultState.name, defaultState);

        this.changeState("default");
    }
}

class PlayButtonDefault extends OscillatingImageState {
    constructor(sprite, stateInfo, amplitude, period) {
        super(sprite, stateInfo, amplitude, period);
    }

    // Private
    _clickFunction(e) {
        const clickX = e.clientX - canvas.offsetLeft;
        const clickY = e.clientY - canvas.offsetTop;

        if (
            clickX >= this._sprite.x &&
            clickX <= this._sprite.x + this._sprite.width &&
            clickY >= this._sprite.y &&
            clickY <= this._sprite.y + this._sprite.height
        ) {
            this._sprite.gameState.game.changeState("main-screen");
        }
    }

    // Public
    enter() {
        super.enter();
        canvas.addEventListener("click", (e) => this._clickFunction(e));
    }

    exit() {
        super.exit();
        canvas.removeEventListener("click", this._clickFunction);
    }
}
