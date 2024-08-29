export class ControlState {
    constructor(controls) {
        this._controls = controls;
        this._gameState;
    }

    _keydownEvents = (e) => {};
    _keyupEvents = (e) => {};

    enter(params) {
        this._gameState = params.gameState;
        this._gameState.controlState = this;
        document.addEventListener("keydown", this._keydownEvents);
        document.addEventListener("keyup", this._keyupEvents);
    }
    update() {}
    exit() {
        document.removeEventListener("keydown", this._keydownEvents);
        document.removeEventListener("keyup", this._keyupEvents);
    }
}
