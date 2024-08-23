import StatefulBase from "../StatefulBase.js";
import MainScreenControls from "./MainScreenControls.js";
import TitleScreenControls from "./TitleScreenControls.js";

export default class Controls extends StatefulBase {
    constructor(game) {
        super();
        this._game = game;
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
}
