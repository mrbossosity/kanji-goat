import NullState from "../NullState.js";
import Sprite from "../Sprite.js";
import SpriteState from "../SpriteState.js";

export default class CliffPlatform extends Sprite {
    constructor(
        name,
        gameState,
        x,
        y,
        width,
        height,
        hitboxOffsetX,
        hitboxOffsetY,
        gap,
        scoreText,
        collisionDetector,
        globalJump,
        pointsAwarded
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

        this._gap = gap;
        this._speedY = 0;

        this._acceptingCollisions = true;
        this._collision = false;

        // Jump animation
        this._isJumping = false;
        this._jumpDistance;
        this._jumpFrameCount;
        this._jumpFrame = 0;
        this._delta = 0;

        // Points
        this._pointsAwarded = pointsAwarded;
        this._scoreText = scoreText;

        // Carrot
        this._carrot;

        globalJump.addEntity(this);
        collisionDetector.addEntity(this);
    }

    // Private
    _resetVariables() {
        // Scroll animation
        this._isJumping = false;
        this._jumpFrame = 0;
        this._delta = 0;
        // Collision detection
        this._acceptingCollisions = true;
        this._collision = false;
        this._pointsAwarded = false;
    }

    _respawn() {
        // New X position, Y position at top of canvas
        let randomX = Math.floor(Math.random() * (512 - this._width + 1));
        this._x = randomX;
        this._y = this._top - this._gap * 2 + this._delta;
        // Reset collision detection
        // this._acceptingCollisions = true;
        this._collision = false;
        this._pointsAwarded = false;

        // Add back into animator in idle state
        // this._canRender = true;
        this.changeState("idle");

        // Respawn carrot
        if (this._carrot) {
            this._carrot.changeState("default");
        }
    }

    _updateJump() {
        if (this._jumpFrame >= this._jumpFrameCount) {
            this._isJumping = false;
        }

        if (this._isJumping) {
            this._delta = this._jumpDistance / this._jumpFrameCount;
            this._y += this._delta;

            if (this._y + this._delta >= 512) {
                this._respawn();
            }

            this._jumpFrame++;
        }
    }

    get speedX() {
        return this._speedX;
    }

    set speedX(value) {
        this._speedX = value;
    }

    get speedY() {
        return this._speedY;
    }

    set speedY(value) {
        this._speedY = value;
    }

    get delta() {
        return this._delta;
    }

    get acceptingCollisions() {
        return this._acceptingCollisions;
    }

    set acceptingCollisions(boolean) {
        this._acceptingCollisions = boolean;
    }

    get collision() {
        return this._collision;
    }

    set collision(value) {
        this._collision = value;
    }

    get carrot() {
        return this._carrot;
    }

    set carrot(carrot) {
        this._carrot = carrot;
    }

    async build() {
        super.build();

        const idleState = new SpriteState(this, {
            name: "idle",
            path: "/src/assets/images/cliff-platform-128-64",
            animates: false,
            loops: false,
            fixedLength: false,
            stateDuration: null,
            stateControlsMvmt: false,
            exitState: "collapsing",
            renders: true,
            acceptingCollisions: true,
        });
        await idleState.build();
        this._stateMachine.addState("idle", idleState);

        const collapsingState = new SpriteState(this, {
            name: "collapsing",
            path: "/src/assets/images/cliff-platform-collapse-128-64",
            animates: true,
            loops: false,
            fixedLength: false,
            stateDuration: null,
            stateControlsMvmt: false,
            exitState: "null",
            renders: true,
        });
        await collapsingState.build();
        this._stateMachine.addState("collapsing", collapsingState);

        const nullState = new NullState(this);
        this.addState("null", nullState);

        this.changeState("idle");
    }

    init() {
        this._x = 128 + this._width / 2;
        this._y = 512 - this._height;
        this._resetVariables();
        this._pointsAwarded = true;

        this.changeState("idle");

        if (this._carrot) {
            this._carrot.changeState("default");
        }
    }

    initAlt() {
        let randomX = Math.floor(Math.random() * (512 - this._width + 1));
        this._x = randomX;
        this._y = 512 - this._height - this._gap;
        this._resetVariables();

        this.changeState("idle");

        if (this._carrot) {
            this._carrot.changeState("default");
        }
    }

    registerLanding() {
        if (!this._pointsAwarded) {
            this._scoreText.addPoints(10);
            this._pointsAwarded = true;
        }
        this._collision = true;
        this.changeState("collapsing");
    }

    jump(jumpDistance, jumpFrameCount) {
        this._isJumping = true;
        this._jumpDistance = jumpDistance;
        this._jumpFrameCount = jumpFrameCount;
        this._jumpFrame = 0;
    }

    update() {
        super.update();
        this._updateJump();
        this._updateHitbox();
    }
}
