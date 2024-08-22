import Sky from "../../../entities/main-screen/Sky.js";
import TitleText from "../../../entities/title-screen/TitleText.js";
import GameState from "./GameState.js";

export default class TitleScreenGame extends GameState {
    constructor(game) {
        super(game);
        this._backgroundSky;
        this._titleText;
    }

    async build() {
        this._backgroundSky = new Sky(0, 0);
        this._titleText = new TitleText(
            this,
            256,
            256,
            null,
            null,
            "Mochi Pop",
            "url(/src/assets/fonts/mochi-pop.ttf)",
            80,
            "white",
            "black"
        );
        await this._titleText.build();

        this._updater.addEntity(this._titleText);

        this._animator.addEntity(this._backgroundSky);
        this._animator.addEntity(this._titleText);
    }

    enter() {
        this._game.controls.changeState("title-screen", {});
    }
}
