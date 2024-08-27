export class ControlState {
    constructor(controls) {
        this._controls = controls;
        this._gameState;
    }

    _keydownEvents(e) {}
    _keyupEvents(e) {}

    enter(params) {
        this._gameState = params.gameState;
        this._gameState.controlState = this;
        document.addEventListener("keydown", (e) => this._keydownEvents(e));
        document.addEventListener("keyup", (e) => this._keyupEvents(e));
    }
    update() {}
    exit() {
        document.removeEventListener("keydown", (e) => this._keydownEvents);
        document.removeEventListener("keyup", (e) => this._keyupEvents);
    }
}
