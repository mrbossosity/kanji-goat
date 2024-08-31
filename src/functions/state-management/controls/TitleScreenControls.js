import { ControlState } from "./ControlState.js";

export default class TitleScreenControls extends ControlState {
    constructor(controls) {
        super(controls);
    }

    _keyupEvents = (e) => {
        if (e.key === "Enter") {
            this._gameState.playButton.click();
            // this._controls.game.changeState("main-screen");
        }
    };

    enter(params) {
        super.enter(params);
    }

    exit() {
        super.exit();
    }
}
