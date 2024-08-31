import BackgroundCliff from "../../../entities/main-screen/BackgroundCliff.js";
import Player from "../../../entities/main-screen/Player.js";
import ScoreText from "../../../entities/main-screen/ScoreText.js";
import StaticImage from "../../../entities/StaticSprite.js";
import CollisionDetector from "../../systems/CollisionDetector.js";
import GlobalJump from "../../systems/GlobalJump.js";
import GravityEnvironment from "../../systems/GravityEnvironment.js";
import GameState from "./GameState.js";
import CliffPlatform from "../../../entities/main-screen/CliffPlatform.js";
import Carrot from "../../../entities/main-screen/Carrot.js";
import BigCarrot from "../../../entities/main-screen/BigCarrot.js";
import TextSprite from "../../../entities/TextSprite.js";

export default class MainScreenGame extends GameState {
    constructor(game) {
        super(game);
        this._controlState;
        this._gravity = new GravityEnvironment(1.3);
        this._collisionDetector = new CollisionDetector(this);
        this._globalJump = new GlobalJump(this);

        this._backgroundSky = new StaticImage(
            "Background Sky",
            this,
            0,
            0,
            512,
            512,
            "/src/assets/images/sky-512.png"
        );
        this._backgroundCliff = new BackgroundCliff(
            "Background Cliff",
            this,
            0,
            0,
            0,
            -512,
            512,
            512,
            this._globalJump
        );
        this._scoreText = new ScoreText(
            "Score Text",
            this,
            20,
            40,
            "Score: ",
            "Supply Text",
            "url(/src/assets/fonts/supply-center.ttf)",
            20,
            "left",
            "darkorange",
            "black",
            2,
            4
        );

        const cliffWidth = 128;
        const cliffHeight = 64;
        const cliffGap = 384;

        this._cliff1 = new CliffPlatform(
            "Cliff Platform 1",
            this,
            128 + cliffWidth / 2,
            512 - cliffHeight,
            cliffWidth,
            cliffHeight,
            0,
            0,
            cliffGap,
            this._scoreText,
            this._collisionDetector,
            this._globalJump,
            true
        );

        let randomX = Math.floor(Math.random() * (512 - cliffWidth + 1));
        this._cliff2 = new CliffPlatform(
            "Cliff Platform 2",
            this,
            randomX,
            512 - cliffHeight - cliffGap,
            cliffWidth,
            cliffHeight,
            0,
            0,
            cliffGap,
            this._scoreText,
            this._collisionDetector,
            this._globalJump,
            false
        );

        this._carrot = new Carrot(
            "Carrot",
            this,
            this._x + 31,
            this._y - 64,
            64,
            64,
            0,
            0,
            this._cliff2,
            this._collisionDetector
        );
        this._cliff2.carrot = this._carrot;

        this._player = new Player(
            "Player",
            this,
            192,
            0,
            128,
            128,
            40,
            8,
            0,
            26,
            this._gravity,
            this._collisionDetector,
            this._globalJump
        );

        this._bigCarrot = new BigCarrot("Big Carrot", this, 64, 64, 384, 256);
        this._carrot.bigCarrot = this._bigCarrot;

        this._carrotText = new TextSprite(
            "Carrot Text",
            this,
            265,
            207,
            "周り",
            "Noto Sans JP",
            "url(/src/assets/fonts/noto-sans-jp.ttf)",
            33,
            "center",
            "black"
        );
        this._carrotText.canRender = false;
        this._carrot.carrotText = this._carrotText;

        this._answerText = new TextSprite(
            "Answer Text",
            this,
            265,
            325,
            "周り",
            "Noto Sans JP",
            "url(/src/assets/fonts/noto-sans-jp.ttf)",
            45,
            "center",
            "darkorange",
            "black",
            2,
            3
        );
        this._answerText.canRender = false;

        this._sfx = {};
    }

    // Private
    _resetVariables() {
        this._player.reset();
        this._backgroundCliff.reset();
        this._cliff1.init();
        this._cliff2.initAlt();
        this._scoreText.reset();
        this._globalJump.reset();
        this._bigCarrot.reset();
        this._carrotText.canRender = false;
        this._answerText.canRender = false;
        this._controlState.carrotPhase = false;
        this._controlState.spacebarDown = false;
        this._globalJump.carrotPhase = false;
        this._game.kanjiManager.input.value = "";
    }

    _pointsByJLPTLevel(card) {
        let level = card.level;
        if (level == 5) {
            console.log("100");
            return 100;
        }
        if (level == 4) {
            console.log("200");
            return 200;
        }
        if (level == 3) {
            console.log("300");
            return 300;
        }
        if (level == 2) {
            console.log("400");
            return 400;
        }
        if (level == 1) {
            console.log("500");
            return 500;
        }
    }

    // Public
    get player() {
        return this._player;
    }

    get scoreText() {
        return this._scoreText;
    }

    get carrotText() {
        return this._carrotText;
    }

    get answerText() {
        return this._answerText;
    }

    get globalJump() {
        return this._globalJump;
    }

    get controlState() {
        return this._controlState;
    }

    set controlState(controlState) {
        this._controlState = controlState;
    }

    kanjiQuiz() {
        const term = this._game.kanjiManager.randomCard();
        this._carrotText.text = term.word;
        this._bigCarrot.changeState("expanding");
        this._game.kanjiManager.input.value = "";
        this._answerText.text = "";
        this._controlState.carrotPhase = true;
        this._globalJump.carrotPhase = true;
    }

    checkAnswer() {
        if (!this._game.kanjiManager.hiraganizedAnswer) return;
        const userAnswer = this._game.kanjiManager.hiraganizedAnswer.trim();
        const currentCard = this._game.kanjiManager.currentCard;
        if (userAnswer == currentCard.furigana) {
            this._sfx.correctSfx.play();
            let points = this._pointsByJLPTLevel(currentCard);
            this._scoreText.addPoints(points);
            this._bigCarrot.changeState("shrinking");
            this._carrotText.canRender = false;
            this._answerText.canRender = false;
            this._controlState.carrotPhase = false;
            this._globalJump.carrotPhase = false;
        } else {
            this._sfx.wrongSfx.play();
        }
    }

    gameOver() {
        const currentCard = this._game.kanjiManager.currentCard;
        if (currentCard) {
            alert(
                `Game Over! The correct reading of ${currentCard.word} is ${currentCard.furigana}, which means "${currentCard.meaning}"`
            );
        } else {
            alert(`Game Over!`);
        }

        this._resetVariables();
        this._game.changeState("title-screen");
    }

    async build() {
        // Construct systems
        this.addToUpdater(this._gravity);
        this.addToUpdater(this._collisionDetector);

        // Construct entities
        await this._backgroundSky.build();
        await this._backgroundCliff.build();
        await this._cliff1.build();
        await this._cliff2.build();
        await this._carrot.build();
        await this._player.build();
        await this._bigCarrot.build();
        await this._carrotText.build();
        await this._answerText.build();
        await this._scoreText.build();

        const correctSfx = new Audio("/src/assets/audio/correct-answer.wav");
        this._sfx.correctSfx = correctSfx;
        const wrongSfx = new Audio("/src/assets/audio/wrong-answer.wav");
        this._sfx.wrongSfx = wrongSfx;
    }

    enter() {
        this._game.controls.changeState("main-screen", {
            gameState: this,
        });
        this._resetVariables();
    }

    exit() {}
}
