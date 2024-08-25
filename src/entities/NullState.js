export default class NullState {
    constructor(sprite) {
        this._sprite = sprite;
    }

    enter() {
        // console.log(`${this._sprite.name} entering null state`);

        this._sprite.acceptingCollisions = false;
        if (this._sprite.canRender) this._sprite.canRender = false;
    }

    update() {}

    exit() {
        this._sprite.acceptingCollisions = true;
    }
}
