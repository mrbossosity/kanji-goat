import Animator from "../../animator.js";
import Updater from "../../updater.js";
import State from "../state.js";

export default class GameState extends State {
    constructor(game) {
        super(game);
        this._game = game;
        this._updater = new Updater();
        this._animator = new Animator();
    }

    // Public
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
