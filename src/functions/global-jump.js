class GlobalJump {
    constructor() {
        this._objectsToJump = [];
    }

    addEntity(entity) {
        this._objectsToJump.push(entity);
    }

    jump(jumpDistance, jumpFrameCount) {
        for (let obj of this._objectsToJump) {
            obj.jump(jumpDistance, jumpFrameCount);
        }
    }
}

export const globalJump = new GlobalJump();
