import StateMachine from "./state-machine.js";

export default class StatefulBase {
    constructor() {
        this._stateMachine = new StateMachine(this);
    }

    async build() {}

    changeState(name) {
        this._stateMachine.changeState(name);
    }

    update() {
        this._stateMachine.update();
    }
}
