import { ControlState } from "./ControlState.js";

export default class MainScreenControls extends ControlState {
    constructor(controls) {
        super(controls);
        this._carrotPhase = false;
        this._spacebarDown = false;
        this._enterDown = false;
        this._answerInput = document.getElementById("answer-input");
    }

    get carrotPhase() {
        return this._carrotPhase;
    }

    set carrotPhase(boolean) {
        this._carrotPhase = boolean;
    }

    get spacebarDown() {
        return this._spacebarDown;
    }

    set spacebarDown(boolean) {
        this._spacebarDown = boolean;
    }

    _keydownEvents = (e) => {
        if (this._carrotPhase) {
            const hiraganizedAnswer = wanakana.toHiragana(
                this._answerInput.value.trim()
            );
            this._gameState.game.kanjiManager.hiraganizedAnswer =
                hiraganizedAnswer;
            this._gameState.answerText.text = hiraganizedAnswer;
            return;
        }
        if (e.key === "ArrowLeft") {
            this._gameState.player.movingLeft = true;
        } else if (e.key === "ArrowRight") {
            this._gameState.player.movingRight = true;
        } else if (e.key === " ") {
            if (!this._spacebarDown) this._spacebarDown = true;
        }
    };

    _keyupEvents = (e) => {
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
            console.log("checking answer");
            this._gameState.checkAnswer();
        }
    };

    update() {
        if (this._spacebarDown) {
            this._gameState.globalJump.jump(384, 35);
        }
    }
}
