import { canvas } from "../../functions/index.js";
import Sprite from "../Sprite.js";
import SpriteState from "../SpriteState.js";

export default class JLPTButtonSprite extends Sprite {
    constructor(
        name,
        gameState,
        x,
        y,
        width,
        height,
        defaultSpritePath,
        selectedSpritePath
    ) {
        super(name, gameState, x, y, width, height);
        this._defaultSpritePath = defaultSpritePath;
        this._selectedSpritePath = selectedSpritePath;
    }

    async build() {
        super.build();

        const defaultState = new JLPTButtonDefault(this, {
            name: "default",
            path: this._defaultSpritePath,
            animates: false,
            loops: false,
            fixedLength: false,
            stateDuration: null,
        });
        await defaultState.build();
        this._stateMachine.addState(defaultState.name, defaultState);

        const selectedState = new JLPTButtonSelected(this, {
            name: "selected",
            path: this._selectedSpritePath,
            animates: false,
            loops: false,
            fixedLength: false,
            stateDuration: null,
        });
        await selectedState.build();
        this._stateMachine.addState(selectedState.name, selectedState);

        this.changeState("default");
    }
}

class JLPTButtonState extends SpriteState {
    constructor(sprite, stateInfo) {
        super(sprite, stateInfo);
    }

    _clickFunction() {}

    enter() {
        super.enter();
        canvas.addEventListener("click", (e) => this._clickFunction(e));
    }

    exit() {
        super.exit();
        canvas.removeEventListener("click", (e) => this._clickFunction);
    }
}

class JLPTButtonDefault extends JLPTButtonState {
    constructor(sprite, stateInfo) {
        super(sprite, stateInfo);
    }

    _clickFunction(e) {
        const clickX = e.clientX - canvas.offsetLeft;
        const clickY = e.clientY - canvas.offsetTop;

        if (
            clickX >= this._sprite.x &&
            clickX <= this._sprite.x + this._sprite.width &&
            clickY >= this._sprite.y &&
            clickY <= this._sprite.y + this._sprite.height
        ) {
            if (this._sprite.stateMachine.currentState.name == "default") {
                this._sprite.stateMachine.changeState("selected", []);
            }
        }
    }
}

class JLPTButtonSelected extends JLPTButtonState {
    constructor(sprite, stateInfo) {
        super(sprite, stateInfo);
    }

    _clickFunction(e) {
        const clickX = e.clientX - canvas.offsetLeft;
        const clickY = e.clientY - canvas.offsetTop;

        if (
            clickX >= this._sprite.x &&
            clickX <= this._sprite.x + this._sprite.width &&
            clickY >= this._sprite.y &&
            clickY <= this._sprite.y + this._sprite.height
        ) {
            if (this._sprite.stateMachine.currentState.name == "selected") {
                this._sprite.stateMachine.changeState("default");
            }
        }
    }
}
