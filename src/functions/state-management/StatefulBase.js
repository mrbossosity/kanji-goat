import StateMachine from "./StateMachine.js";

export default class StatefulBase {
    constructor() {
        this._stateMachine = new StateMachine(this);
    }

    async build() {}

    changeState(name, params) {
        this._stateMachine.changeState(name, params);
    }

    update() {
        this._stateMachine.update();
    }
}
