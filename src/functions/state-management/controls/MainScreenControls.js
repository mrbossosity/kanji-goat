import { ControlState } from "./ControlState.js";

export default class MainScreenControls extends ControlState {
    constructor(controls) {
        super(controls);
        this._carrotPhase = false;
        this._spacebarDown = false;
        this._answerInput = document.getElementById("answer-input");
    }

    get carrotPhase() {
        return this._carrotPhase;
    }

    set carrotPhase(boolean) {
        this._carrotPhase = boolean;
    }

    _keydownEvents(e) {
        if (this._carrotPhase) return;
        if (e.key === "ArrowLeft") {
            this._gameState.player.movingLeft = true;
        } else if (e.key === "ArrowRight") {
            this._gameState.player.movingRight = true;
        } else if (e.key === " ") {
            if (!this._spacebarDown) this._spacebarDown = true;
        }
    }

    _keyupEvents(e) {
        if (this._carrotPhase) {
            const hiraganizedAnswer = wanakana.toHiragana(
                this._answerInput.value.trim()
            );
            this._gameState.game.kanjiManager.hiraganizedAnswer =
                hiraganizedAnswer;
            this._gameState.answerText.text = hiraganizedAnswer;
        }

        if (e.key === "ArrowLeft") {
            this._gameState.player.movingLeft = false;
        } else if (e.key === "ArrowRight") {
            this._gameState.player.movingRight = false;
        } else if (e.key === " ") {
            this._spacebarDown = false;
        } else if (e.key === "Enter") {
            this._gameState.checkAnswer();
        }
    }

    enter(params) {
        super.enter(params);
    }

    update() {
        if (this._spacebarDown) {
            this._gameState.globalJump.jump(384, 35);
        }
    }

    exit() {
        super.exit();
    }
}
