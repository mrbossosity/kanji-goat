import { ctx } from "../functions/index.js";
import StatefulBase from "../functions/state-management/StatefulBase.js";
import SpriteState from "./SpriteState.js";

export default class Sprite extends StatefulBase {
    constructor(name, gameState, x, y, width, height, statesInfo) {
        super();
        this._name = name;
        this._gameState = gameState;
        this._x = x;
        this._y = y;
        this._initX = x;
        this._initY = y;
        this._width = width;
        this._height = height;

        this._statesInfo = statesInfo;
        // statesInfo formatted as [{ name: "", path: "", animates: boolean, loops: boolean, fixedLength: boolean, stateDuration: int }]
        this._renderSpecs; // communicated from current sprite state each frame
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

    get gameState() {
        return this._gameState;
    }

    get stateMachine() {
        return this._stateMachine;
    }

    get renderSpecs() {
        return this._renderSpecs;
    }

    set renderSpecs(value) {
        this._renderSpecs = value;
    }

    async build() {
        for (let stateInfo of this._statesInfo) {
            const spriteState = new SpriteState(this, stateInfo);
            await spriteState.build();
            this._stateMachine.addState(spriteState.name, spriteState);
        }
    }

    changeState(name, params) {
        this._stateMachine.changeState(name, params);
    }

    update() {
        super.update();
    }

    render() {
        if (!this._renderSpecs) return;
        ctx.drawImage(
            this._renderSpecs.a,
            this._renderSpecs.b,
            this._renderSpecs.c,
            this._renderSpecs.d,
            this._renderSpecs.e,
            this._renderSpecs.f,
            this._renderSpecs.g,
            this._renderSpecs.h,
            this._renderSpecs.i
        );
    }
}
