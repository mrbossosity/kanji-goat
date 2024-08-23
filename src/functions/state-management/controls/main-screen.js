import { ControlState } from "./ControlState.js";

export default class MainScreenControls extends ControlState {
    constructor(controls) {
        super(controls);
    }

    _keydownEvents(e) {
        if (e.key === "ArrowLeft") {
            this._controllables.player.movingLeft = true;
        } else if (e.key === "ArrowRight") {
            this._controllables.player.movingRight = true;
        } else if (e.key === " ") {
            this._controllables.globalJump.jump(384, 35);
        }
    }

    _keyupEvents(e) {
        if (e.key === "ArrowLeft") {
            this._controllables.player.movingLeft = false;
        } else if (e.key === "ArrowRight") {
            this._controllables.player.movingRight = false;
        }
    }

    enter(controllables) {
        this._controllables = controllables;
        document.addEventListener("keydown", (e) => this._keydownEvents(e));
        document.addEventListener("keyup", (e) => this._keyupEvents(e));
    }

    // update() {}

    exit() {
        document.removeEventListener("keydown", (e) => this._keydownEvents);
        document.removeEventListener("keyup", (e) => this._keyupEvents);
    }
}
