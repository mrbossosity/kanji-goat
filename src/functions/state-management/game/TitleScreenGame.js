import StaticSprite from "../../../entities/StaticSprite.js";
import JLPTButton from "../../../entities/title-screen/JLPTButton.js";
import PlayButton from "../../../entities/title-screen/PlayButton.js";
import TitleText from "../../../entities/title-screen/TitleText.js";
import GameState from "./GameState.js";

export default class TitleScreenGame extends GameState {
    constructor(game) {
        super(game);
        this._backgroundSky = new StaticSprite(
            "Background Sky",
            this,
            0,
            0,
            512,
            512,
            "/src/assets/images/sky-512.png"
        );

        this._backgroundOverlay = new StaticSprite(
            "Background Overlay",
            this,
            0,
            0,
            512,
            512,
            "/src/assets/images/title-background-512.png"
        );
        this._titleText = new TitleText(
            "Title Text",
            this,
            256,
            156,
            "漢字 Goat",
            "Mochi Pop",
            "url(/src/assets/fonts/mochi-pop.ttf)",
            80,
            "center",
            "darkorange",
            "black",
            3,
            7
        );

        const buttonsY = 205;
        const buttonsGap = 75;

        this._n5Button = new JLPTButton(
            "N5 Button",
            this,
            124,
            buttonsY,
            64,
            64,
            "/src/assets/images/n5-button-64",
            "/src/assets/images/n5-button-selected-64"
        );
        this._n4Button = new JLPTButton(
            "N4 Button",
            this,
            224,
            buttonsY,
            64,
            64,
            "/src/assets/images/n4-button-64",
            "/src/assets/images/n4-button-selected-64"
        );
        this._n3Button = new JLPTButton(
            "N3 Button",
            this,
            324,
            buttonsY,
            64,
            64,
            "/src/assets/images/n3-button-64",
            "/src/assets/images/n3-button-selected-64"
        );

        this._n2Button = new JLPTButton(
            "N2 Button",
            this,
            174,
            buttonsY + buttonsGap,
            64,
            64,
            "/src/assets/images/n2-button-64",
            "/src/assets/images/n2-button-selected-64"
        );
        this._n1Button = new JLPTButton(
            "N1 Button",
            this,
            274,
            buttonsY + buttonsGap,
            64,
            64,
            "/src/assets/images/n1-button-64",
            "/src/assets/images/n1-button-selected-64"
        );
        this._playButton = new PlayButton(
            "Play Button",
            this,
            184,
            375,
            96,
            64
        );
    }

    async build() {
        await this._backgroundSky.build();
        await this._backgroundOverlay.build();
        await this._titleText.build();
        await this._n5Button.build();
        await this._n4Button.build();
        await this._n3Button.build();
        await this._n2Button.build();
        await this._n1Button.build();
        await this._playButton.build();

        // this._updater.addEntity(this._titleText);
        // this._updater.addEntity(this._n5Button);
        // this._updater.addEntity(this._n4Button);
        // this._updater.addEntity(this._n3Button);
        // this._updater.addEntity(this._n2Button);
        // this._updater.addEntity(this._n1Button);
        // this._updater.addEntity(this._playButton);

        // this._animator.addEntity(this._backgroundSky);
        // this._animator.addEntity(this._backgroundOverlay);
        // this._animator.addEntity(this._titleText);
        // this._animator.addEntity(this._n5Button);
        // this._animator.addEntity(this._n4Button);
        // this._animator.addEntity(this._n3Button);
        // this._animator.addEntity(this._n2Button);
        // this._animator.addEntity(this._n1Button);
        // this._animator.addEntity(this._playButton);
    }

    enter() {
        this._game.controls.changeState("title-screen", {});
    }
}
