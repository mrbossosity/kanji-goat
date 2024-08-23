import StateMachine from "../state-machine.js";
import MainScreenControls from "./main-screen.js";
import TitleScreenControls from "./title-screen.js";

export default class Controls {
    constructor(game) {
        this._game = game;
        this._stateMachine = new StateMachine(this);
    }

    get game() {
        return this._game;
    }

    async build() {
        const titleScreen = new TitleScreenControls(this);
        const mainScreen = new MainScreenControls(this);
        this._stateMachine.addState("title-screen", titleScreen);
        this._stateMachine.addState("main-screen", mainScreen);
    }

    changeState(name, params) {
        this._stateMachine.changeState(name, params);
    }

    update() {
        this._stateMachine.update();
    }
}

// export const controls = new Controls();
