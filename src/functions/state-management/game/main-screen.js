import BackgroundCliff from "../../../entities/main-screen/BackgroundCliff.js";
import Player from "../../../entities/main-screen/Player.js";
import ScoreText from "../../../entities/main-screen/ScoreText.js";
import StaticImage from "../../../entities/StaticImage.js";
import CliffGenerator from "../../cliff-generator.js";
import CollisionDetector from "../../systems/collision-detection.js";
import DBLoader from "../../db-loader.js";
import GlobalJump from "../../systems/global-jump.js";
import GravityEnvironment from "../../systems/gravity.js";
import GameState from "./GameState.js";

export default class MainScreenGame extends GameState {
    constructor(game) {
        super(game);
        this._backgroundSky;
        this._backgroundCliff;
        this._scoreText;
        this._player;
        this._gravity;
        this._globalJump;

        this._dbLoader;
    }

    resetGame() {
        this._player.reset();
        this._cliffGenerator.reset();
        this._backgroundCliff.reset();
        this._scoreText.reset();
        this._globalJump.reset();
    }

    async build() {
        // Construct systems
        this._gravity = new GravityEnvironment(1.3);
        this._collisionDetector = new CollisionDetector();
        this._globalJump = new GlobalJump();

        // Construct entities
        this._backgroundSky = new StaticImage(
            "Background Sky",
            this,
            0,
            0,
            512,
            512,
            "/src/assets/images/sky-512.png"
        );
        await this._backgroundSky.build();

        this._backgroundCliff = new BackgroundCliff(
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
            45,
            "Score: ",
            "Supply Text",
            "url(/src/assets/fonts/supply-center.ttf)",
            25,
            "left",
            "darkorange",
            "black",
            2,
            4
        );
        await this._scoreText.build();

        this._cliffGenerator = new CliffGenerator(
            128,
            64,
            384,
            this._scoreText,
            this._collisionDetector,
            this._globalJump
        );

        this._player = new Player(
            this,
            192,
            0,
            128,
            128,
            8,
            0,
            26,
            this._gravity,
            this._collisionDetector,
            this._globalJump
        );

        this._updater.addEntity(this._backgroundCliff);
        this._updater.addEntity(this._cliffGenerator.cliff1);
        this._updater.addEntity(this._cliffGenerator.cliff2);
        this._updater.addEntity(this._player);
        this._updater.addEntity(this._gravity);
        this._updater.addEntity(this._collisionDetector);

        this._animator.addEntity(this._backgroundSky);
        this._animator.addEntity(this._backgroundCliff);
        this._animator.addEntity(this._cliffGenerator.cliff1);
        this._animator.addEntity(this._cliffGenerator.cliff2);
        this._animator.addEntity(this._player);
        this._animator.addEntity(this._scoreText);

        // Load text/fonts/db
        this._dbLoader = new DBLoader([
            {
                name: "N5",
                path: "/src/assets/jlpt-db/n5.json",
            },
            {
                name: "N4",
                path: "/src/assets/jlpt-db/n4.json",
            },
            {
                name: "N3",
                path: "/src/assets/jlpt-db/n3.json",
            },
            {
                name: "N2",
                path: "/src/assets/jlpt-db/n2.json",
            },
            {
                name: "N1",
                path: "/src/assets/jlpt-db/n1.json",
            },
        ]);
        await this._dbLoader.load();
    }

    enter() {
        this._game.controls.changeState("main-screen", {
            player: this._player,
            globalJump: this._globalJump,
        });
    }

    exit() {}
}
