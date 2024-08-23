export default class GlobalJump {
    constructor() {
        this._objectsToJump = [];
        this._backgroundScrolling = false;
        this._playerJumping = false;
        this._isJumpingAllowed = true;
    }

    // Public
    get backgroundScrolling() {
        return this._backgroundScrolling;
    }

    set backgroundScrolling(value) {
        this._backgroundScrolling = value;
    }

    get playerJumping() {
        return this._playerJumping;
    }

    set playerJumping(value) {
        this._playerJumping = value;
    }

    reset() {
        this._backgroundScrolling = false;
        this._playerJumping = false;
        this._isJumpingAllowed = true;
    }

    addEntity(entity) {
        this._objectsToJump.push(entity);
    }

    jump(jumpDistance, jumpFrameCount) {
        if (!this._isJumpingAllowed) return;
        this._isJumpingAllowed = false;

        if (this._backgroundScrolling || this._playerJumping) {
            this._isJumpingAllowed = true;
            return;
        }

        for (let obj of this._objectsToJump) {
            obj.jump(jumpDistance, jumpFrameCount);
        }
        this._isJumpingAllowed = true;
    }
}
