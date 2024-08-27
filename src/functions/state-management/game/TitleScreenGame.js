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
            "/src/assets/images/n5-button-selected-64",
            () => {
                if (this._n5Button.currentState.name == "default") {
                    this._n5Button.changeState("selected");
                    this._game.kanjiManager.addDeck("N5");
                }
            },
            () => {
                if (this._n5Button.currentState.name == "selected") {
                    this._n5Button.changeState("default");
                    this._game.kanjiManager.removeDeck("N5");
                }
            }
        );
        this._n4Button = new JLPTButton(
            "N4 Button",
            this,
            224,
            buttonsY,
            64,
            64,
            "/src/assets/images/n4-button-64",
            "/src/assets/images/n4-button-selected-64",
            () => {
                if (this._n4Button.currentState.name == "default") {
                    this._n4Button.changeState("selected");
                    this._game.kanjiManager.addDeck("N4");
                }
            },
            () => {
                if (this._n4Button.currentState.name == "selected") {
                    this._n4Button.changeState("default");
                    this._game.kanjiManager.removeDeck("N4");
                }
            }
        );
        this._n3Button = new JLPTButton(
            "N3 Button",
            this,
            324,
            buttonsY,
            64,
            64,
            "/src/assets/images/n3-button-64",
            "/src/assets/images/n3-button-selected-64",
            () => {
                if (this._n3Button.currentState.name == "default") {
                    this._n3Button.changeState("selected");
                    this._game.kanjiManager.addDeck("N3");
                }
            },
            () => {
                if (this._n3Button.currentState.name == "selected") {
                    this._n3Button.changeState("default");
                    this._game.kanjiManager.removeDeck("N3");
                }
            }
        );
        this._n2Button = new JLPTButton(
            "N2 Button",
            this,
            174,
            buttonsY + buttonsGap,
            64,
            64,
            "/src/assets/images/n2-button-64",
            "/src/assets/images/n2-button-selected-64",
            () => {
                if (this._n2Button.currentState.name == "default") {
                    this._n2Button.changeState("selected");
                    this._game.kanjiManager.addDeck("N2");
                }
            },
            () => {
                if (this._n2Button.currentState.name == "selected") {
                    this._n2Button.changeState("default");
                    this._game.kanjiManager.removeDeck("N2");
                }
            }
        );
        this._n1Button = new JLPTButton(
            "N1 Button",
            this,
            274,
            buttonsY + buttonsGap,
            64,
            64,
            "/src/assets/images/n1-button-64",
            "/src/assets/images/n1-button-selected-64",
            () => {
                if (this._n1Button.currentState.name == "default") {
                    this._n1Button.changeState("selected");
                    this._game.kanjiManager.addDeck("N1");
                }
            },
            () => {
                if (this._n1Button.currentState.name == "selected") {
                    this._n1Button.changeState("default");
                    this._game.kanjiManager.removeDeck("N1");
                }
            }
        );
        this._playButton = new PlayButton(
            "Play Button",
            this,
            184,
            375,
            96,
            64,
            null,
            null,
            null,
            null,
            (gameRef) => {
                gameRef.changeState("main-screen");
                gameRef.kanjiManager.buildGameDeck();
                window.setTimeout(() => {
                    document.getElementById("answer-input").focus();
                }, 0);
            }
        );
    }

    get playButton() {
        return this._playButton;
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
    }

    enter() {
        this._game.controls.changeState("title-screen", {
            gameState: this,
        });
    }
}
