export default class GlobalJump {
    constructor() {
        this._objectsToJump = [];
        this._isJumping = false;
    }

    // Public
    get isJumping() {
        return this._isJumping;
    }

    set isJumping(value) {
        this._isJumping = value;
    }

    addEntity(entity) {
        this._objectsToJump.push(entity);
    }

    jump(jumpDistance, jumpFrameCount) {
        if (this._isJumping) return; // Don't jump if jump is in progress
        for (let obj of this._objectsToJump) {
            obj.jump(jumpDistance, jumpFrameCount);
        }
    }
}
