export default class StateMachine {
    constructor(entity) {
        this._entity = entity;
        this._currentState = null;
        this._states = {};
    }

    get currentState() {
        return this._currentState;
    }

    addState(name, state) {
        this._states[name] = state;
    }

    changeState(name, params) {
        if (this._currentState == this._states[name]) return; // Don't change if already current
        if (this._states[name]) {
            if (this._currentState) this._currentState.exit();
            this._currentState = this._states[name];
            this._currentState.enter(params);
        }
    }

    update() {
        if (this._currentState) {
            this._currentState.update();
        }
    }
}
