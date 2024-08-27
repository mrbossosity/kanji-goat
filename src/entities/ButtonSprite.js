import { canvas } from "../functions/index.js";
import Sprite from "./Sprite.js";
import SpriteState from "./SpriteState.js";

export default class ButtonSprite extends Sprite {
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
        super(name, gameState, x, y, width, height);
        this._defaultSpritePath = defaultSpritePath;
        this._selectedSpritePath = selectedSpritePath;
        this._selectCallbackFn = selectCallbackFn; // if button has two complementary states and click actions
        this._deselectCallbackFn = deselectCallbackFn;
        this._soleCallbackFn = soleCallbackFn; // if button only has one click action
    }

    click() {}

    async build() {
        super.build();
    }
}

export class ButtonSpriteState extends SpriteState {
    constructor(sprite, stateInfo, callbackFn) {
        super(sprite, stateInfo);
        this._callbackFn = callbackFn;
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
            this._callbackFn();
        }
    }

    enter() {
        if (this._renders) this._sprite.canRender = true;
        canvas.addEventListener("click", (e) => this._clickFunction(e));
    }

    exit() {
        super.exit();
        canvas.removeEventListener("click", (e) => this._clickFunction);
    }
}
