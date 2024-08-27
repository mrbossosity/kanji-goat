import Controls from "../controls/Controls.js";
import MainScreenGame from "./MainScreenGame.js";
import StatefulBase from "../StatefulBase.js";
import TitleScreenGame from "./TitleScreenGame.js";
import KanjiManager from "../../kanji/KanjiManager.js";

export default class Game extends StatefulBase {
    constructor(fps, ms) {
        super();
        this._fps = fps;
        this._lastTime = 0;
        this._interval = ms;
        this._controls = new Controls(this);
        this._kanjiManager = new KanjiManager(this, [
            {
                name: "N5",
                path: "/src/assets/jlpt-db/n5-clean.json",
            },
            {
                name: "N4",
                path: "/src/assets/jlpt-db/n4-clean.json",
            },
            {
                name: "N3",
                path: "/src/assets/jlpt-db/n3-clean.json",
            },
            {
                name: "N2",
                path: "/src/assets/jlpt-db/n2-clean.json",
            },
            {
                name: "N1",
                path: "/src/assets/jlpt-db/n1-clean.json",
            },
        ]);
    }

    get controls() {
        return this._controls;
    }

    get kanjiManager() {
        return this._kanjiManager;
    }

    async build() {
        // Build controls
        await this._controls.build();
        await this._kanjiManager.build();

        // Build game states
        const titleScreenGame = new TitleScreenGame(this);
        const mainScreenGame = new MainScreenGame(this);
        await titleScreenGame.build();
        await mainScreenGame.build();
        this._stateMachine.addState("title-screen", titleScreenGame);
        this._stateMachine.addState("main-screen", mainScreenGame);
    }

    update() {
        super.update();
        this._controls.update();
        this._kanjiManager.update();
    }

    gameloop(timestamp) {
        let timeElapsed = timestamp - this._lastTime;
        if (timeElapsed >= this._interval) {
            this._lastTime = timestamp;
            this.update();
        }

        requestAnimationFrame(this.gameloop.bind(this));
    }
}
