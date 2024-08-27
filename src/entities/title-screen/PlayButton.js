import { canvas } from "../../functions/index.js";
import ButtonSprite from "../ButtonSprite.js";
import OscillatingImageState from "../OscillatingImageState.js";

export default class PlayButton extends ButtonSprite {
    constructor(
        name,
        gameState,
        x,
        y,
        width,
        height,
        defaultSpritePath,
        selectedSpritePath,
        selectCallbackFn,
        deselectCallbackFn,
        soleCallbackFn
    ) {
        super(
            name,
            gameState,
            x,
            y,
            width,
            height,
            defaultSpritePath,
            selectedSpritePath,
            selectCallbackFn,
            deselectCallbackFn,
            soleCallbackFn
        );
    }

    click() {
        this._soleCallbackFn(this._game);
    }

    async build() {
        super.build();

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
            180,
            this._soleCallbackFn
        );
        await defaultState.build();
        this._stateMachine.addState(defaultState.name, defaultState);

        this.changeState("default");
    }
}

class PlayButtonDefault extends OscillatingImageState {
    constructor(sprite, stateInfo, amplitude, period, soleCallbackFn) {
        super(sprite, stateInfo, amplitude, period);
        this._soleCallbackFn = soleCallbackFn;
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
            this._soleCallbackFn(this._sprite.game);
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
