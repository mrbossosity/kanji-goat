import { ctx } from "../functions/index.js";
import StatefulBase from "../functions/state-management/StatefulBase.js";

export default class Sprite extends StatefulBase {
    constructor(
        name,
        gameState,
        x,
        y,
        width,
        height,
        hitboxOffsetX,
        hitboxOffsetY
    ) {
        super();
        this._name = name;
        this._gameState = gameState;
        this._x = x;
        this._y = y;
        this._initX = x;
        this._initY = y;
        this._width = width;
        this._height = height;

        // Hitbox
        this._hitboxOffsetX = hitboxOffsetX;
        this._hitboxOffsetY = hitboxOffsetY;
        this._left = this._x + this._hitboxOffsetX;
        this._right = this._x + this._width - this._hitboxOffsetX;
        this._top = this._y + this._hitboxOffsetY;
        this._bottom = this._y + this._height - this._hitboxOffsetY;

        this._canRender = true; // true by default
        this._renderSpecs; // communicated from current sprite state each frame
    }

    // Private
    _updateHitbox() {
        this._left = this._x + this._hitboxOffsetX;
        this._right = this._x + this._width - this._hitboxOffsetX;
        this._top = this._y;
        this._bottom = this._y + this._height;
    }

    // Public
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

    get left() {
        return this._left;
    }

    get right() {
        return this._right;
    }

    get top() {
        return this._top;
    }

    get bottom() {
        return this._bottom;
    }

    get hitbox() {
        return {
            left: this._left,
            right: this._right,
            top: this._top,
            bottom: this._bottom,
        };
    }

    get gameState() {
        return this._gameState;
    }

    get stateMachine() {
        return this._stateMachine;
    }

    get currentState() {
        return this._stateMachine.currentState;
    }

    get canRender() {
        return this._canRender;
    }

    set canRender(boolean) {
        this._canRender = boolean;
    }

    get renderSpecs() {
        return this._renderSpecs;
    }

    set renderSpecs(value) {
        this._renderSpecs = value;
    }

    async build() {
        this._gameState.addToUpdater(this);
        this._gameState.addToAnimator(this);
    }

    addState(name, state) {
        this._stateMachine.addState(name, state);
    }

    changeState(name, params) {
        this._stateMachine.changeState(name, params);
    }

    update() {
        super.update();
    }

    render() {
        if (!this._renderSpecs) return;
        if (!this._canRender) return;
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
