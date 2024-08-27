import NullState from "../NullState.js";
import Sprite from "../Sprite.js";
import SpriteState from "../SpriteState.js";

export default class BigCarrot extends Sprite {
    constructor(name, gameState, x, y, width, height) {
        super(name, gameState, x, y, width, height);
    }

    reset() {
        this.changeState("null");
    }

    async build() {
        const expandingState = new SpriteState(this, {
            name: "expanding",
            path: "/src/assets/images/expanding-carrot-384-256",
            animates: true,
            loops: false,
            fixedLength: false,
            stateDuration: null,
            stateControlsMvmt: false,
            exitState: "main",
            renders: true,
            acceptingCollisions: false,
        });
        await expandingState.build();
        this.addState("expanding", expandingState);

        const mainState = new SpriteState(
            this,
            {
                name: "main",
                path: "/src/assets/images/big-carrot-384-256",
                animates: false,
                loops: false,
                fixedLength: true,
                stateDuration: 300,
                stateControlsMvmt: false,
                exitState: "shrinking",
                renders: true,
                acceptingCollisions: false,
            },
            () => {
                if (!this._gameState.carrotText.canRender)
                    this._gameState.carrotText.canRender = true;
                if (!this._gameState.answerText.canRender)
                    this._gameState.answerText.canRender = true;
            }
        );
        await mainState.build();
        this.addState("main", mainState);

        const shrinkingState = new SpriteState(
            this,
            {
                name: "shrinking",
                path: "/src/assets/images/shrinking-carrot-384-256",
                animates: true,
                loops: false,
                fixedLength: false,
                stateDuration: null,
                stateControlsMvmt: false,
                exitState: "null",
                renders: true,
                acceptingCollisions: false,
            },
            () => {
                if (this._gameState.carrotText.canRender)
                    this._gameState.carrotText.canRender = false;
                if (this._gameState.answerText.canRender)
                    this._gameState.answerText.canRender = false;
            }
        );
        await shrinkingState.build();
        this.addState("shrinking", shrinkingState);

        const nullState = new NullState(this);
        this.addState("null", nullState);

        super.build();
    }
}
