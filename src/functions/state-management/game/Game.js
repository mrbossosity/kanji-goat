import Controls from "../controls/Controls.js";
import MainScreenGame from "./main-screen.js";
import StatefulBase from "../StatefulBase.js";
import TitleScreenGame from "./title-screen.js";

class Game extends StatefulBase {
    constructor() {
        super();
        this._fps = 120;
        this._lastTime = 0;
        this._interval = 1000 / this._fps;
        this._controls;
    }

    get controls() {
        return this._controls;
    }

    async build() {
        // Build controls
        this._controls = new Controls(this);
        await this._controls.build();

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

export const game = new Game();
