import NullState from "../NullState.js";
import Sprite from "../Sprite.js";
import SpriteState from "../SpriteState.js";

export default class Carrot extends Sprite {
    constructor(
        name,
        gameState,
        x,
        y,
        width,
        height,
        hitboxOffsetX,
        hitboxOffsetY,
        parentCliff,
        collisionDetector
    ) {
        super(
            name,
            gameState,
            x,
            y,
            width,
            height,
            hitboxOffsetX,
            hitboxOffsetY
        );

        this._acceptingCollisions;
        this._collisionDetector = collisionDetector;
        this._collisionDetector.carrot = this;
        this._collisionDetector.addEntity(this);

        this._parentCliff = parentCliff;
        this._bigCarrot;
        this._carrotText;
    }

    get acceptingCollisions() {
        return this._acceptingCollisions;
    }

    set acceptingCollisions(boolean) {
        this._acceptingCollisions = boolean;
    }

    get bigCarrot() {
        return this._bigCarrot;
    }

    set bigCarrot(carrotSprite) {
        this._bigCarrot = carrotSprite;
    }

    get carrotText() {
        return this._carrotText;
    }

    set carrotText(carrotSprite) {
        this._carrotText = carrotSprite;
    }

    carrotCollision() {
        this._gameState.kanjiQuiz();
        this.changeState("null");
    }

    async build() {
        super.build();

        const defaultState = new SpriteState(this, {
            name: "default",
            path: "/src/assets/images/carrot-64-32",
            animates: false,
            loops: false,
            fixedLength: false,
            stateDuration: null,
            stateControlsMvmt: false,
            renders: true,
            acceptingCollisions: true,
        });

        await defaultState.build();
        this.addState("default", defaultState);

        const nullState = new NullState(this);
        this.addState("null", nullState);

        this.changeState("default");
    }

    update() {
        super.update();
        this._x = this._parentCliff.x + 31;
        this._y = this._parentCliff.y - 54;
        this._updateHitbox();
    }
}
