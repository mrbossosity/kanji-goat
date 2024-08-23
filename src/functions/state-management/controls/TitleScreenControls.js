import { ControlState } from "./ControlState.js";

export default class TitleScreenControls extends ControlState {
    constructor(controls) {
        super(controls);
    }

    _keydownEvents(e) {
        if (e.key === "Enter") {
            this._controls.game.changeState("main-screen");
        }
    }

    enter(controllables) {
        this._controllables = controllables;
        document.addEventListener("keydown", (e) => this._keydownEvents(e));
    }

    exit() {
        document.removeEventListener("keydown", (e) => this._keydownEvents);
    }
}
