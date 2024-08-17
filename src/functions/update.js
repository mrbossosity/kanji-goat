class GlobalUpdate {
    constructor() {
        this._objectsToUpdate = [];
    }

    addEntity(entity) {
        this._objectsToUpdate.push(entity);
    }

    update() {
        for (let obj of this._objectsToUpdate) {
            obj.update();
        }
    }
}

export const globalUpdate = new GlobalUpdate();
