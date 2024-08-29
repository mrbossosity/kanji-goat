export default class GlobalJump {
    constructor(gameState) {
        this._gameState = gameState;
        this._objectsToJump = [];
        this._backgroundScrolling = false;
        this._playerJumping = true;
        this._jumpThrottler = true;
        this._carrotPhase = false;
    }

    // Public
    get backgroundScrolling() {
        return this._backgroundScrolling;
    }

    set backgroundScrolling(boolean) {
        this._backgroundScrolling = boolean;
    }

    get playerJumping() {
        return this._playerJumping;
    }

    set playerJumping(boolean) {
        this._playerJumping = boolean;
    }

    get carrotPhase() {
        return this._carrotPhase;
    }

    set carrotPhase(boolean) {
        this._carrotPhase = boolean;
    }

    reset() {
        this._backgroundScrolling = false;
        this._playerJumping = false;
        this._jumpThrottler = true;
    }

    addEntity(entity) {
        this._objectsToJump.push(entity);
    }

    jump(jumpDistance, jumpFrameCount) {
        if (!this._jumpThrottler) return;
        this._jumpThrottler = false;

        if (this._backgroundScrolling || this._playerJumping) {
            this._jumpThrottler = true;
            return;
        }

        if (this._carrotPhase) {
            this._jumpThrottler = true;
            return;
        }

        for (let obj of this._objectsToJump) {
            obj.jump(jumpDistance, jumpFrameCount);
        }
        this._jumpThrottler = true;
    }
}
