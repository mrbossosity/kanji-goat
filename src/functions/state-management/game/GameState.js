import Animator from "../Animator.js";
import Updater from "../Updater.js";

export default class GameState {
    constructor(game) {
        this._game = game;
        this._updater = new Updater();
        this._animator = new Animator();
    }

    // Public
    get game() {
        return this._game;
    }
    get updater() {
        return this._updater;
    }

    get animator() {
        return this._animator;
    }

    async build() {}

    enter() {}

    update() {
        this._updater.update();
        this._animator.render();
    }

    exit() {}
}
